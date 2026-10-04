"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import type { CompanyStat } from "@/data/company";
import { useCountUp } from "@/lib/useCountUp";
import { EASE_STANDARD } from "@/lib/motion";

const ILLUSTRATIVE_FILL_PERCENT = 45;

function formatStatValue(stat: CompanyStat): string {
  if (stat.value == null) return "";
  const precision = stat.precision ?? (Number.isInteger(stat.value) ? 0 : 1);
  return `${stat.value.toFixed(precision)}${stat.unit ?? ""}`;
}

function CounterValue({
  target,
  active,
  decimals,
}: {
  target: number;
  active: boolean;
  decimals: number;
}) {
  const display = useCountUp(target, active, decimals);
  return <>{display}</>;
}

/**
 * 穴の空いていない通常の円グラフ。
 * r を半径の半分・stroke-width を直径ぶんにすると、strokeがそのまま中心まで届くため
 * stroke-dashoffset の進捗が「扇形が埋まっていく角度」になる（ドーナツの穴が残らない）。
 */
function PieValue({ percent, active }: { percent: number; active: boolean }) {
  const r = 25;
  const circumference = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r="49" className="fill-[var(--color-paper-100)]" />
      <motion.circle
        cx="50"
        cy="50"
        r={r}
        strokeWidth={r * 2}
        className="fill-none stroke-[var(--color-accent-500)]"
        style={{ strokeDasharray: circumference }}
        initial={{ strokeDashoffset: circumference }}
        animate={active ? { strokeDashoffset: circumference * (1 - percent / 100) } : undefined}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
      />
      <circle cx="50" cy="50" r="49" className="fill-none stroke-[var(--color-paper-200)]" strokeWidth="1" />
    </svg>
  );
}

function FlipValue({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <motion.span
      className="font-display inline-block text-5xl font-semibold text-[var(--color-ink-900)] md:text-6xl"
      style={{ transformPerspective: 400 }}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={active ? { rotateX: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
    >
      {children}
    </motion.span>
  );
}

function BarValue({ percent, active }: { percent: number; active: boolean }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-paper-200)]">
      <motion.div
        className="h-full rounded-full bg-[var(--color-accent-500)]"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: percent / 100 } : undefined}
        transition={{ duration: 1, ease: EASE_STANDARD }}
      />
    </div>
  );
}

/**
 * 「売上成長」カードの背景グラフィック。右肩上がりの3本を下から順に伸ばす。
 * 数字・イラストの背面に大きく敷くが、薄い赤＋半透明で可読性は妨げない。
 */
function GrowthBars({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-6 bottom-0 flex h-[82%] items-end justify-center gap-4 opacity-60 md:gap-6"
    >
      {[0.4, 0.66, 1].map((h, i) => (
        <motion.span
          key={i}
          className="w-16 origin-bottom rounded-t-md bg-[var(--color-accent-500)] md:w-24"
          style={{ height: `${h * 100}%` }}
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE_STANDARD, delay: 0.2 + i * 0.22 }}
        />
      ))}
    </div>
  );
}

export function StatCard({ stat }: { stat: CompanyStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const isPlaceholder = stat.status === "placeholder";
  const decimals = stat.precision ?? (stat.value != null && !Number.isInteger(stat.value) ? 2 : 0);
  const percent = isPlaceholder ? ILLUSTRATIVE_FILL_PERCENT : (stat.value ?? 0);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] px-6 py-7"
    >
      {stat.id === "revenue-growth" && <GrowthBars active={inView} />}

      {isPlaceholder && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-paper-050)]">
          仮
        </span>
      )}

      {/* 「何の数字か」→「イラスト」→「数字」の順に読ませる。項目名は常に上部中央。 */}
      <p className="relative text-center text-sm font-medium tracking-[0.04em] text-[var(--color-ink-700)]">
        {stat.label}
      </p>

      <div className="relative mt-5 flex items-center justify-center gap-5 sm:gap-8">
        {stat.icon && (
          <Image
            src={stat.icon}
            alt=""
            aria-hidden
            width={280}
            height={240}
            className={`h-auto shrink-0 ${stat.iconWidthClass ?? "w-24 sm:w-28"}`}
          />
        )}

        <div className="flex min-w-0 flex-col items-center">
          {stat.display === "counter" && !isPlaceholder && stat.value != null && (
            <p className="font-display text-5xl leading-none font-semibold text-[var(--color-ink-900)] md:text-6xl">
              <CounterValue target={stat.value} active={inView} decimals={decimals} />
              <span className="ml-1 text-2xl font-normal md:text-3xl">{stat.unit}</span>
            </p>
          )}

          {stat.display === "pie" && (
            <div className="relative flex h-28 w-28 items-center justify-center">
              <PieValue percent={percent} active={inView} />
              <span className="font-display absolute text-2xl font-semibold text-[var(--color-ink-900)]">
                {isPlaceholder ? stat.placeholderText : formatStatValue(stat)}
              </span>
            </div>
          )}

          {stat.display === "flip" && (
            <FlipValue active={inView}>
              {isPlaceholder || stat.value == null ? (
                stat.placeholderText
              ) : (
                <>
                  {stat.value.toFixed(decimals)}
                  <span className="ml-0.5 text-2xl font-normal md:text-3xl">{stat.unit}</span>
                </>
              )}
            </FlipValue>
          )}

          {stat.display === "bar" && (
            <div className="w-44">
              <p className="font-display mb-3 text-center text-5xl leading-none font-semibold text-[var(--color-ink-900)] md:text-6xl">
                {isPlaceholder || stat.value == null ? (
                  stat.placeholderText
                ) : (
                  <>
                    {stat.value.toFixed(decimals)}
                    <span className="ml-0.5 text-2xl font-normal md:text-3xl">{stat.unit}</span>
                  </>
                )}
              </p>
              <BarValue percent={percent} active={inView} />
            </div>
          )}
        </div>
      </div>

      {stat.note && (
        <p className="relative mt-4 text-center text-xs text-[var(--color-ink-500)]">{stat.note}</p>
      )}
    </div>
  );
}
