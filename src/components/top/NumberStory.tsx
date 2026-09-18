"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useCountUp } from "@/lib/useCountUp";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { EASE_STANDARD } from "@/lib/motion";
import type { CompanyStat } from "@/data/company";

// 1項目あたりのスクロール距離（vh）。各項目のMotionが完了する前に次の項目へ
// 切り替わってしまわないよう、十分な余白（sticky区間）を確保している。
const STEP_VH = 100;

const itemVariants = {
  eyebrow: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
  },
  number: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
  },
  unit: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } },
  },
  note: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15 } },
  },
  illustration: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1, ease: EASE_STANDARD } },
  },
};

// 項目ごとの線画イラスト（仮）。後から実際のSVG/PNGへ差し替えやすいよう、
// stat.id をキーにしたパス辞書だけを差し替えれば済む構造にしている。
const illustrationPaths: Record<string, ReactNode> = {
  "average-age": (
    <>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5 20c0-4 3-6.4 7-6.4s7 2.4 7 6.4" />
    </>
  ),
  "parental-leave-return-rate": (
    <>
      <circle cx="8.5" cy="7" r="2.6" />
      <circle cx="16" cy="8.5" r="2" />
      <path d="M3.5 19.5c0-3.4 2.2-5.4 5-5.4s5 2 5 5.4" />
      <path d="M13.5 14.3c1.9.3 3.2 1.9 3.2 5.2" />
    </>
  ),
  "male-parental-leave-rate": (
    <path d="M12 20s-6.8-4-6.8-9.2A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 6.8 2.5c0 5.2-6.8 9.2-6.8 9.2z" />
  ),
  "paid-leave-days": (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <circle cx="12" cy="14.5" r="1.6" />
    </>
  ),
  "retention-rate": (
    <>
      <circle cx="8" cy="9" r="2.6" />
      <circle cx="16" cy="9" r="2.6" />
      <path d="M3.5 19.3c0-3 2-4.8 4.5-4.8s4.5 1.8 4.5 4.8" />
      <path d="M11.5 19.3c0-3 2-4.8 4.5-4.8s4.5 1.8 4.5 4.8" />
    </>
  ),
  "revenue-growth": (
    <>
      <path d="M4 17l5-5 3.5 3.5L20 8" />
      <path d="M14.5 8H20v5.5" />
    </>
  ),
};

/** 項目ごとのイラスト表示エリア（現時点では仮の線画）。stat.idで差し替え可能。 */
function NumberIllustration({ stat, variants }: { stat: CompanyStat; variants?: typeof itemVariants.illustration }) {
  const path = illustrationPaths[stat.id];
  const Wrapper = variants ? motion.div : "div";
  return (
    <Wrapper
      {...(variants ? { variants } : {})}
      aria-hidden
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-dashed border-[var(--color-paper-200)] text-[var(--color-ink-500)] md:h-20 md:w-20"
    >
      {path && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 md:h-10 md:w-10"
        >
          {path}
        </svg>
      )}
    </Wrapper>
  );
}

function formatNumberValue(stat: CompanyStat): { display: string; unit: string; isPlaceholder: boolean } {
  if (stat.status !== "confirmed" || stat.value == null) {
    return { display: stat.placeholderText ?? "XX", unit: stat.unit ?? "", isPlaceholder: true };
  }
  return { display: "", unit: stat.unit ?? "", isPlaceholder: false };
}

/** 1項目分のビジュアル（NUMBER表記・項目名・巨大な数字・単位・イラスト枠・補足）。 active で表示アニメーションを開始する。 */
function NumberStoryItem({
  stat,
  index,
  active,
  total,
  reduceMotion = false,
}: {
  stat: CompanyStat;
  index: number;
  active: boolean;
  total: number;
  reduceMotion?: boolean;
}) {
  const { display: placeholderDisplay, unit, isPlaceholder } = formatNumberValue(stat);
  const decimals = stat.precision ?? (stat.value != null && !Number.isInteger(stat.value) ? 2 : 0);
  const countUp = useCountUp(stat.value ?? 0, active && !isPlaceholder, decimals);

  if (reduceMotion) {
    // prefers-reduced-motion: 動きを一切付けず、最終値をそのまま表示する。
    return (
      <div className="relative">
        <p className="font-display text-xs tracking-[0.3em] text-[var(--color-accent-600)] uppercase">
          NUMBER {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <div className="mt-5 flex flex-col items-start justify-between gap-x-10 gap-y-6 sm:flex-row sm:items-end">
          <p className="text-3xl leading-snug font-bold text-[var(--color-ink-900)] md:text-5xl">{stat.label}</p>
          <div className="flex items-end gap-4">
            <NumberIllustration stat={stat} />
            <div className="flex items-end gap-3">
              <span
                className="font-display leading-none text-[var(--color-ink-900)]"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
              >
                {isPlaceholder ? placeholderDisplay : stat.value?.toFixed(decimals)}
              </span>
              {unit && <span className="mb-1 text-xl font-bold text-[var(--color-ink-700)] md:text-2xl">{unit}</span>}
              {isPlaceholder && (
                <span className="mb-2 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] text-[var(--color-paper-050)]">
                  仮
                </span>
              )}
            </div>
          </div>
        </div>
        {stat.note && <p className="mt-5 text-sm text-[var(--color-ink-500)]">{stat.note}</p>}
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate={active ? "visible" : "hidden"} className="relative">
      <motion.p
        variants={itemVariants.eyebrow}
        className="font-display text-xs tracking-[0.3em] text-[var(--color-accent-600)] uppercase"
      >
        NUMBER {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </motion.p>

      {/* 左：項目名を大きく／右：塗りありの実数値・単位・イラスト枠。背景の巨大アウトライン数字はGiantBackgroundNumberが別途担う。 */}
      <div className="mt-5 flex flex-col items-start justify-between gap-x-10 gap-y-6 sm:flex-row sm:items-end">
        <motion.p
          variants={itemVariants.eyebrow}
          className="text-3xl leading-snug font-bold text-[var(--color-ink-900)] md:text-5xl"
        >
          {stat.label}
        </motion.p>

        <div className="flex items-end gap-4">
          <NumberIllustration stat={stat} variants={itemVariants.illustration} />
          <div className="flex items-end gap-3">
            <motion.span
              variants={itemVariants.number}
              className="font-display leading-none text-[var(--color-ink-900)]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
            >
              {isPlaceholder ? placeholderDisplay : countUp}
            </motion.span>
            {unit && (
              <motion.span
                variants={itemVariants.unit}
                className="mb-1 text-xl font-bold text-[var(--color-ink-700)] md:text-2xl"
              >
                {unit}
              </motion.span>
            )}
            {isPlaceholder && (
              <motion.span
                variants={itemVariants.unit}
                className="mb-2 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] text-[var(--color-paper-050)]"
              >
                仮
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {stat.note && (
        <motion.p variants={itemVariants.note} className="mt-5 text-sm text-[var(--color-ink-500)]">
          {stat.note}
        </motion.p>
      )}
    </motion.div>
  );
}

function GiantBackgroundNumber({ stat }: { stat: CompanyStat }) {
  const decimals = stat.precision ?? (stat.value != null && !Number.isInteger(stat.value) ? 2 : 0);
  const text =
    stat.status === "confirmed" && stat.value != null ? stat.value.toFixed(decimals) : (stat.placeholderText ?? "");
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <span
        className="font-display leading-none whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-ink-900)_14%,transparent)]"
        style={{ fontSize: "clamp(10rem, 34vw, 26rem)" }}
      >
        {text}
      </span>
    </div>
  );
}

function SideIndicator({ stats, activeIndex }: { stats: CompanyStat[]; activeIndex: number }) {
  return (
    <div className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:left-10">
      {stats.map((stat, i) => (
        <div key={stat.id} className="flex items-center gap-2">
          <span
            className={`font-display text-[10px] transition-colors ${
              i === activeIndex ? "text-[var(--color-accent-600)]" : "text-[var(--color-ink-300)]"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`h-px transition-all duration-300 ${
              i === activeIndex ? "w-10 bg-[var(--color-accent-600)]" : "w-4 bg-[var(--color-ink-300)]"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function DesktopNumberStory({ stats }: { stats: CompanyStat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // JavaScriptでホイール操作自体をロックするのではなく、sticky + 十分なスクロール領域
  // （STEP_VH×項目数）だけで「自然にスクロールしているが区間内に留まる」状態を作る。
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(stats.length - 1, Math.max(0, Math.floor(v * stats.length)));
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${stats.length * STEP_VH}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <GiantBackgroundNumber stat={stats[activeIndex]} />
        <SideIndicator stats={stats} activeIndex={activeIndex} />
        <Container>
          <div className="max-w-4xl pl-0 lg:pl-16 xl:pl-20">
            <AnimatePresence mode="wait">
              <NumberStoryItem key={activeIndex} stat={stats[activeIndex]} index={activeIndex} active total={stats.length} />
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}

function MobileNumberItem({
  stat,
  index,
  total,
  reduceMotion,
}: {
  stat: CompanyStat;
  index: number;
  total: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative border-b border-[var(--color-paper-200)] py-16 first:pt-0 last:border-b-0">
      <GiantBackgroundNumber stat={stat} />
      <div className="relative">
        <NumberStoryItem
          stat={stat}
          index={index}
          active={reduceMotion ? true : inView}
          total={total}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}

/**
 * TOPページ「数字で見るノーブデンス」。
 * PC：stickyと十分なスクロール領域（STEP_VH×項目数）で01→06を順番に切り替え、
 *     各項目のMotionが完了するだけの余白を確保する（ホイール操作自体はロックしない）。
 * スマホ：長時間のsticky固定は避け、通常の縦スクロール＋InView Motionで1項目ずつ表示する。
 */
export function NumberStory({ stats }: { stats: CompanyStat[] }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion() ?? false;

  if (isDesktop && !reduceMotion) {
    return <DesktopNumberStory stats={stats} />;
  }

  return (
    <Container className="max-w-4xl">
      {stats.map((stat, i) => (
        <MobileNumberItem key={stat.id} stat={stat} index={i} total={stats.length} reduceMotion={reduceMotion} />
      ))}
    </Container>
  );
}
