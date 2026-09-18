"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

export type BenefitIconName = "holidays" | "childcare" | "qualification" | "salary" | "inhouse" | "health";

// NavIcon.tsx と同じ線画スタイル（viewBox 0 0 24 / strokeWidth 1.6 / round cap-join）に統一。
// 後から作成した線画SVGへ差し替えやすいよう、パスだけをこの辞書に集約している。
const paths: Record<BenefitIconName, ReactNode> = {
  holidays: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8.5 14l2 2 4-4" />
    </>
  ),
  childcare: (
    <>
      <circle cx="9" cy="6.5" r="2.5" />
      <circle cx="16.5" cy="10" r="1.8" />
      <path d="M4 20c0-3.5 2.2-5.5 5-5.5s5 2 5 5.5" />
      <path d="M14.8 13.2c1.9.3 3.2 1.8 3.2 4.3" />
    </>
  ),
  qualification: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5v16" />
      <path d="M8 8h7M8 11.5h7" />
    </>
  ),
  salary: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.5 9v0M17.5 15v0" />
    </>
  ),
  inhouse: (
    <>
      <path d="M4 21V8l8-4.5L20 8v13" />
      <path d="M4 21h16" />
      <path d="M9.5 21v-6h5v6" />
      <path d="M9.5 11h1M13.5 11h1" />
    </>
  ),
  health: (
    <>
      <path d="M12 20.2c-4.6-2.9-8-6-8-9.8a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 3.8-3.4 6.9-8 9.8z" />
      <path d="M6.5 11h2l1.5-2.5 2 5 1.5-2.5h4" />
    </>
  ),
};

/** 福利厚生アイコン。細めの線画SVGで統一し、後から線画SVG/PNGへ差し替えやすい構造にしている。 */
export function BenefitIcon({ name, className = "h-6 w-6" }: { name: BenefitIconName; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: EASE_STANDARD }}
    >
      {paths[name]}
    </motion.svg>
  );
}
