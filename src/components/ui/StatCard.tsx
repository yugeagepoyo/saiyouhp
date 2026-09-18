"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import type { CompanyStat } from "@/data/company";
import { useCountUp } from "@/lib/useCountUp";

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

function RingValue({ percent, active }: { percent: number; active: boolean }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90" aria-hidden>
      <circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="8"
        className="fill-none stroke-[var(--color-paper-200)]"
      />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="8"
        strokeLinecap="round"
        className="fill-none stroke-[var(--color-accent-500)]"
        style={{ strokeDasharray: circumference }}
        initial={{ strokeDashoffset: circumference }}
        animate={active ? { strokeDashoffset: circumference * (1 - percent / 100) } : undefined}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function FlipValue({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <motion.span
      className="font-display inline-block text-4xl md:text-5xl"
      style={{ transformPerspective: 400 }}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={active ? { rotateX: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function StatCard({ stat }: { stat: CompanyStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const isPlaceholder = stat.status === "placeholder";
  const decimals = stat.precision ?? (stat.value != null && !Number.isInteger(stat.value) ? 2 : 0);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] px-6 py-8 text-center"
    >
      {isPlaceholder && (
        <span className="absolute top-3 right-3 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-paper-050)]">
          仮
        </span>
      )}

      {stat.display === "counter" && !isPlaceholder && stat.value != null && (
        <p className="font-display text-4xl text-[var(--color-ink-900)] md:text-5xl">
          <CounterValue target={stat.value} active={inView} decimals={decimals} />
          <span className="ml-1 text-xl">{stat.unit}</span>
        </p>
      )}

      {stat.display === "ring" && (
        <div className="relative flex h-24 w-24 items-center justify-center">
          <RingValue percent={isPlaceholder ? ILLUSTRATIVE_FILL_PERCENT : (stat.value ?? 0)} active={inView} />
          <span className="font-display absolute text-lg text-[var(--color-ink-900)]">
            {isPlaceholder ? stat.placeholderText : formatStatValue(stat)}
          </span>
        </div>
      )}

      {stat.display === "flip" && (
        <FlipValue active={inView}>
          {isPlaceholder ? stat.placeholderText : formatStatValue(stat)}
        </FlipValue>
      )}

      {stat.display === "bar" && (
        <div className="w-full">
          <p className="font-display mb-3 text-3xl text-[var(--color-ink-900)]">
            {isPlaceholder ? stat.placeholderText : formatStatValue(stat)}
          </p>
          <BarValue percent={isPlaceholder ? ILLUSTRATIVE_FILL_PERCENT : (stat.value ?? 0)} active={inView} />
        </div>
      )}

      <div>
        {/* イラストに項目名が含まれているため、画像がある場合はテキストのラベルを置き換える。 */}
        {stat.icon ? (
          <Image
            src={stat.icon}
            alt={stat.label}
            width={288}
            height={385}
            className={`mx-auto h-auto ${stat.iconWidthClass ?? "w-28 md:w-32"}`}
          />
        ) : (
          <p className="text-sm font-medium text-[var(--color-ink-700)]">{stat.label}</p>
        )}
        {stat.note && <p className="mt-1 text-xs text-[var(--color-ink-500)]">{stat.note}</p>}
      </div>
    </div>
  );
}
