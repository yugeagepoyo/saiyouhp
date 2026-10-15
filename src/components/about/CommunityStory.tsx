"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useCountUp } from "@/lib/useCountUp";
import { EASE_STANDARD } from "@/lib/motion";
import type { CommunityActivity } from "@/data/community";

function StatDisplay({ stat, active }: { stat: NonNullable<CommunityActivity["stat"]>; active: boolean }) {
  const isPlaceholder = stat.value == null;
  const decimals = stat.precision ?? (stat.value != null && !Number.isInteger(stat.value) ? 2 : 0);
  const countUp = useCountUp(stat.value ?? 0, active && !isPlaceholder, decimals);

  return (
    <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-[var(--color-paper-200)] px-5 py-3">
      <span className="font-display text-2xl text-[var(--color-ink-900)]">
        {isPlaceholder ? stat.placeholderText : countUp}
      </span>
      {stat.unit && <span className="text-sm text-[var(--color-ink-700)]">{stat.unit}</span>}
      <span className="text-xs text-[var(--color-ink-500)]">{stat.label}</span>
      {isPlaceholder && (
        <span className="rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] text-[var(--color-paper-050)]">
          仮
        </span>
      )}
    </div>
  );
}

const AUTO_PLAY_INTERVAL_MS = 4500;
/** 手動操作後に自動再生へ戻るまでの時間。自動送りの間隔とは独立させ、従来の挙動を保つ。 */
const MANUAL_PAUSE_MS = 4000;
/** 写真のクロスフェード時間。前後の写真を重ねたままゆっくり入れ替える。 */
const PHOTO_FADE_S = 0.6;
/** タイトル・説明文の切り替え時間。写真と同じタイミングで入れ替わるよう揃えている。 */
const TEXT_FADE_S = 0.3;

/** 地域や社会への還元：1つの活動を大きく見せるストーリー型UI。左に写真、右にテキストと数字。 */
export function CommunityStory({ activities }: { activities: CommunityActivity[] }) {
  // 写真が登録されている項目だけをスライドにする（空枠・プレースホルダーは作らない）。
  const slides = activities.filter((activity) => activity.imageSrc);
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  // 手動操作の直後は自動再生を一時停止し、AUTO_PLAY_INTERVAL_MS後に再開する。
  const [manualPause, setManualPause] = useState(false);
  const reduceMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);

  const total = slides.length;
  const activity = slides[active];

  // 手動操作（ボタン／ドット）の後は自動再生を一時停止し、一定時間後に再開する。
  function pauseAutoPlayThenResume() {
    setManualPause(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setManualPause(false), MANUAL_PAUSE_MS);
  }

  function go(direction: 1 | -1) {
    setActive((prev) => (prev + direction + total) % total);
    pauseAutoPlayThenResume();
  }

  function selectIndex(i: number) {
    setActive(i);
    pauseAutoPlayThenResume();
  }

  // 自動スライドショー：常に「次へ」方向のみへ進め、巻き戻るような見え方を作らない。
  // hover中・手動操作直後・prefers-reduced-motion時は停止する。
  useEffect(() => {
    if (reduceMotion || isHovering || manualPause || total <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, isHovering, manualPause, total]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  if (!activity) return null;

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {/* 上部：タイトルと説明文。下部に横長の大きな写真を置く縦構成。 */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 max-w-3xl">
          <p className="font-display text-xs tracking-[0.3em] text-[var(--color-accent-600)] uppercase">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: TEXT_FADE_S, ease: EASE_STANDARD }}
            >
              <h3 className="font-serif-jp mt-4 text-2xl font-bold text-[var(--color-ink-900)] md:text-4xl">
                {activity.title}
              </h3>
              <p className="jp-pretty mt-5 text-sm leading-loose text-[var(--color-ink-700)] md:text-base">
                {activity.description}
              </p>
              {activity.areas && activity.areas.length > 0 && (
                <p className="mt-5 text-sm text-[var(--color-ink-700)]">
                  <span className="text-[var(--color-ink-500)]">連携地域：</span>
                  {activity.areas.join("／")}
                </p>
              )}
              {activity.stat && <StatDisplay stat={activity.stat} active />}
              {activity.link && (
                <a
                  href={activity.link.href}
                  className="mt-6 inline-block text-sm font-medium text-[var(--color-accent-600)] underline underline-offset-4"
                >
                  {activity.link.label} →
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 下部：横幅いっぱいの横長写真 */}
      {/* 写真はタイトル・説明文とのバランスを取り、幅を少し抑えて配置する。 */}
      <div
        ref={photoRef}
        className="relative mt-10 aspect-[4/3] overflow-hidden md:mt-12 md:ml-auto md:aspect-[16/9] md:w-[86%]"
      >
        <AnimatePresence>
          <motion.div
            key={activity.id}
            className="absolute inset-[-4%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: PHOTO_FADE_S, ease: "easeInOut" }}
            style={{ y: parallaxY }}
          >
            <PlaceholderImage
              alt={activity.title}
              label={activity.imageLabel}
              src={activity.imageSrc}
              objectPosition={activity.imagePosition}
            />
          </motion.div>
        </AnimatePresence>

        {/* 送りボタンは写真の左右中央に重ねる。写真の上でも見失わないよう白の半透明を敷く。 */}
        <button
          type="button"
          aria-label="前の活動を表示"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-paper-200)] bg-[var(--color-paper-050)]/85 text-xl text-[var(--color-ink-900)] backdrop-blur-sm transition-colors hover:bg-[var(--color-paper-050)] hover:text-[var(--color-accent-600)] md:left-4 md:h-12 md:w-12"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="次の活動を表示"
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-paper-200)] bg-[var(--color-paper-050)]/85 text-xl text-[var(--color-ink-900)] backdrop-blur-sm transition-colors hover:bg-[var(--color-paper-050)] hover:text-[var(--color-accent-600)] md:right-4 md:h-12 md:w-12"
        >
          ›
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {activities.map((a, i) => (
          <button
            key={a.id}
            type="button"
            aria-label={`${a.title}を表示`}
            onClick={() => selectIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-[var(--color-accent-600)]" : "w-1.5 bg-[var(--color-paper-200)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
