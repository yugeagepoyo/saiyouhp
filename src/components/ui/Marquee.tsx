"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

/** 手動操作のあと、自動スクロールを再開するまでの待ち時間（ms） */
const RESUME_DELAY = 2600;
/** ドラッグ扱いにする移動量（px）。これ未満ならクリック（リンク遷移）として扱う。 */
const DRAG_THRESHOLD = 8;

/** 範囲 [min, max) に値を巻き込む（継ぎ目のないループ用） */
function wrapValue(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  return min + (((value - min) % range) + range) % range;
}

interface MarqueeProps<T> {
  items: T[];
  getKey: (item: T) => string;
  /** clone が true の列は複製側。リンクのフォーカスを外すために使う。 */
  renderItem: (item: T, clone: boolean) => ReactNode;
  /** 自動スクロール速度（px/秒） */
  speed?: number;
  /** 流れる向き */
  direction?: "left" | "right";
  className?: string;
}

/**
 * 横方向へゆっくり流れ続けるカルーセルの共通実装。
 *
 * ・要素を2組複製し、1組分の幅で位置を巻き込むことで継ぎ目のない無限ループにする
 *   （最後から最初へ戻る動きが見えないようにするため）
 * ・ホバーしても流れは止めず、ドラッグ・スワイプ中だけ停止する
 * ・手動操作後は少し間を置いて自動スクロールを再開する
 * ・prefers-reduced-motion では自動スクロールを行わない
 *
 * カードの見た目・間隔（右マージン）は renderItem 側で指定する。
 */
export function Marquee<T>({
  items,
  getKey,
  renderItem,
  speed = 30,
  direction = "left",
  className = "",
}: MarqueeProps<T>) {
  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const dragging = useRef(false);
  const resumeAt = useRef(0);
  const lastPointerX = useRef(0);
  const movedDistance = useRef(0);
  const reduceMotion = useReducedMotion() ?? false;
  const [grabbing, setGrabbing] = useState(false);
  const sign = direction === "left" ? -1 : 1;

  // 1組分の幅（カード幅＋間隔の合計）を測る。ブレークポイントで幅が変わるため監視する。
  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const measure = () => {
      setWidth.current = el.getBoundingClientRect().width;
      x.set(wrapValue(x.get(), -setWidth.current, 0));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || dragging.current) return;
    if (performance.now() < resumeAt.current) return;
    const width = setWidth.current;
    if (!width) return;
    // タブ復帰時などに delta が極端に大きくなり飛んで見えるのを防ぐ。
    const step = (Math.min(delta, 50) / 1000) * speed;
    x.set(wrapValue(x.get() + sign * step, -width, 0));
  });

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    movedDistance.current = 0;
    lastPointerX.current = event.clientX;
    setGrabbing(true);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const dx = event.clientX - lastPointerX.current;
      lastPointerX.current = event.clientX;
      movedDistance.current += Math.abs(dx);

      // ポインタ捕捉はドラッグと判定できてから行う。
      // 押した瞬間に捕捉すると click がカード（リンク）ではなくこの要素に飛び、
      // 詳細ページへ遷移できなくなるため。
      if (movedDistance.current > DRAG_THRESHOLD) {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          /* noop */
        }
      }

      const width = setWidth.current;
      if (!width) return;
      x.set(wrapValue(x.get() + dx, -width, 0));
    },
    [x],
  );

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setGrabbing(false);
    resumeAt.current = performance.now() + RESUME_DELAY;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      /* noop */
    }
  }, []);

  // ドラッグ操作のあとに詳細ページへ遷移してしまわないようにする。
  const onClickCapture = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (movedDistance.current > DRAG_THRESHOLD) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  const copy = (clone: boolean) => (
    <div
      ref={clone ? undefined : setRef}
      className="flex shrink-0"
      aria-hidden={clone ? true : undefined}
    >
      {items.map((item) => (
        <div key={getKey(item)} className="contents">
          {renderItem(item, clone)}
        </div>
      ))}
    </div>
  );

  return (
    <div
      data-marquee
      /* ホバー時の拡大が上下で切れないよう、クリップ範囲に少し余白を持たせる。 */
      className={`overflow-hidden py-4 select-none ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ touchAction: "pan-y" }}
      /* ドラッグ中に写真のネイティブドラッグが始まるのを防ぐ。 */
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {copy(false)}
        {copy(true)}
      </motion.div>
    </div>
  );
}
