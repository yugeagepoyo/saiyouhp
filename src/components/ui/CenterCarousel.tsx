"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  type WheelEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

const CARD_WIDTH = "min(78vw, 380px)";
const MAX_SCALE_DROP = 0.28;
const MAX_OPACITY_DROP = 0.4;
// 中央カードの前後何枚分を実DOMとして描画するか。中央インデックスは無制限に増減させ、
// 各スロットに割り当てるカードの中身だけをmodulo演算で差し替えることで、
// 「巻き戻り」も「終端」も存在しない数学的にシームレスな無限ループを実現している。
const WINDOW_RADIUS = 8;
const SLOT_INDICES = Array.from({ length: WINDOW_RADIUS * 2 + 1 }, (_, k) => k - WINDOW_RADIUS);
const SLIDE_TRANSITION = { duration: 0.4, ease: EASE_STANDARD } as const;
const FLICK_VELOCITY_THRESHOLD = 0.5; // px/ms。小さいドラッグ量でも素早いフリックなら1枚送る

function mod(value: number, n: number) {
  return ((value % n) + n) % n;
}

function CarouselSlot({
  i,
  offsetX,
  stepRef,
  maxDistanceRef,
  cardRef,
  children,
}: {
  i: number;
  offsetX: MotionValue<number>;
  stepRef: RefObject<number>;
  maxDistanceRef: RefObject<number>;
  cardRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  // distance: 0 = 中央（最大サイズ）、1 = 最も離れている（最小サイズ）。中央からのピクセル距離を
  // スロット位置(i*step)とドラッグ/遷移中のoffsetXから毎フレーム算出する。
  const scale = useTransform(offsetX, (v) => {
    const step = stepRef.current || 1;
    const maxDistance = maxDistanceRef.current || 1;
    const distance = Math.min(1, Math.abs(i * step + v) / maxDistance);
    return 1 - distance * MAX_SCALE_DROP;
  });
  const opacity = useTransform(offsetX, (v) => {
    const step = stepRef.current || 1;
    const maxDistance = maxDistanceRef.current || 1;
    const distance = Math.min(1, Math.abs(i * step + v) / maxDistance);
    return 1 - distance * MAX_OPACITY_DROP;
  });

  return (
    <motion.div ref={cardRef} data-carousel-card className="shrink-0" style={{ width: CARD_WIDTH, scale, opacity }}>
      {children}
    </motion.div>
  );
}

/**
 * 中央のカードを主役にしたカルーセル。ネイティブの横スクロール（トラックパッド・スマホスワイプ）に加え、
 * PCでのマウスドラッグ、矢印ボタンに対応。中央からの距離に応じてscale/opacityを連続的に変化させる。
 *
 * 無限ループの実装方式：物理スクロール位置をリセットする方式ではなく、
 * 「無制限に増減する論理インデックス」と「常に中央スロットを画面中央に置く固定ウィンドウ描画」を
 * 組み合わせた仮想インデックス方式。中央スロットの位置は常に一定のため、インデックスを何度
 * 進めても戻しても位置の「瞬間補正」自体が発生せず、終端も巻き戻りも構造的に存在しない。
 */
export function CenterCarousel({ children }: { children: ReactNode[] }) {
  const n = children.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const offsetX = useMotionValue(0);
  // 静止時の中央寄せオフセット。useTransformは「渡された関数」の変化ではなく
  // 「参照しているMotionValue自体の変化」にしか反応しないため、
  // 単なるReact stateではなくMotionValueとして持ち、offsetXと合成する。
  const restOffsetPx = useMotionValue(0);
  const trackX = useTransform([offsetX, restOffsetPx], ([v, r]) => (v as number) + (r as number));

  const stepRef = useRef(1);
  const maxDistanceRef = useRef(1);
  const isAnimating = useRef(false);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const isDragging = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastMoveTime = useRef(0);
  const lastMoveX = useRef(0);
  const velocity = useRef(0);

  const wheeling = useRef(false);
  const wheelBaseOffset = useRef(0);
  const wheelAccum = useRef(0);
  const wheelSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const card = middleCardRef.current;
    if (!container || !card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    // ビューポート座標系だけで完結させる（コンテナのpadding分だけ中央がズレるバグを避けるため、
    // 「トラック基準の相対位置」とは混ぜず、現在位置から中央までの差分をそのまま加算する）。
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cardCenter = cardRect.left + cardRect.width / 2;
    const delta = containerCenter - cardCenter;
    restOffsetPx.set(restOffsetPx.get() + delta);
    stepRef.current = cardRect.width + 24;
    maxDistanceRef.current = containerRect.width * 0.62;
  }, [restOffsetPx]);

  useLayoutEffect(() => {
    measure();
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // ボタン／矢印キー操作：1枚分だけ滑らかに送り、完了と同時にindexを進めてoffsetXを0へ戻す。
  // 見た目上は同一位置のため、この瞬間の切り替わりはユーザーには一切見えない。
  const commitStep = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating.current || n === 0) return;
      isAnimating.current = true;
      const step = stepRef.current;
      const target = -direction * step;
      controlsRef.current = animate(offsetX, target, {
        ...SLIDE_TRANSITION,
        onComplete: () => {
          setIndex((i) => i + direction);
          offsetX.set(0);
          isAnimating.current = false;
        },
      });
    },
    [n, offsetX],
  );

  function stopActiveAnimation() {
    controlsRef.current?.stop();
    controlsRef.current = null;
    isAnimating.current = false;
  }

  function settleFromOffset(rawOffset: number, flickVelocity: number) {
    const step = stepRef.current || 1;
    let stepsCrossed = Math.round(rawOffset / step);
    if (stepsCrossed === 0 && Math.abs(flickVelocity) > FLICK_VELOCITY_THRESHOLD) {
      stepsCrossed = flickVelocity < 0 ? 1 : -1;
    }
    const maxSteps = WINDOW_RADIUS - 1;
    stepsCrossed = Math.max(-maxSteps, Math.min(maxSteps, stepsCrossed));
    const target = stepsCrossed * step;
    isAnimating.current = true;
    controlsRef.current = animate(offsetX, target, {
      ...SLIDE_TRANSITION,
      onComplete: () => {
        if (stepsCrossed !== 0) setIndex((i) => i - stepsCrossed);
        offsetX.set(0);
        isAnimating.current = false;
      },
    });
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    stopActiveAnimation();
    isDragging.current = true;
    dragStartClientX.current = e.clientX;
    dragStartOffset.current = offsetX.get();
    lastMoveTime.current = e.timeStamp;
    lastMoveX.current = e.clientX;
    velocity.current = 0;
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartClientX.current;
    offsetX.set(dragStartOffset.current + dx);
    const dt = e.timeStamp - lastMoveTime.current;
    if (dt > 0) velocity.current = (e.clientX - lastMoveX.current) / dt;
    lastMoveTime.current = e.timeStamp;
    lastMoveX.current = e.clientX;
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
    settleFromOffset(offsetX.get(), velocity.current);
  }

  function onWheel(e: WheelEvent<HTMLDivElement>) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // 縦スクロールの邪魔をしない
    e.preventDefault();
    if (!wheeling.current) {
      wheeling.current = true;
      stopActiveAnimation();
      wheelBaseOffset.current = offsetX.get();
      wheelAccum.current = 0;
    }
    wheelAccum.current -= e.deltaX;
    offsetX.set(wheelBaseOffset.current + wheelAccum.current);
    if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
    wheelSettleTimer.current = setTimeout(() => {
      wheeling.current = false;
      settleFromOffset(offsetX.get(), 0);
    }, 140);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") commitStep(1);
    if (e.key === "ArrowLeft") commitStep(-1);
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        role="region"
        aria-label="カードカルーセル"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        className="cursor-grab overflow-hidden px-[11%] py-8 select-none active:cursor-grabbing sm:px-[20%]"
      >
        <motion.div ref={trackRef} className="flex items-center gap-6" style={{ x: trackX }}>
          {SLOT_INDICES.map((i) => (
            <CarouselSlot
              key={`slot-${i}`}
              i={i}
              offsetX={offsetX}
              stepRef={stepRef}
              maxDistanceRef={maxDistanceRef}
              cardRef={i === 0 ? middleCardRef : undefined}
            >
              {n > 0 ? children[mod(index + i, n)] : null}
            </CarouselSlot>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="前のカードを表示"
        onClick={() => commitStep(-1)}
        className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] text-lg text-[var(--color-ink-700)] shadow-md transition-transform duration-200 hover:scale-110 hover:border-[var(--color-accent-600)] sm:h-12 sm:w-12"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="次のカードを表示"
        onClick={() => commitStep(1)}
        className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] text-lg text-[var(--color-ink-700)] shadow-md transition-transform duration-200 hover:scale-110 hover:border-[var(--color-accent-600)] sm:h-12 sm:w-12"
      >
        ›
      </button>
    </div>
  );
}
