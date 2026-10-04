"use client";

import { motion } from "motion/react";
import type { DepartmentHoverEffect } from "@/data/departments";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * 部署アイコン。
 * SaaS管理画面のピクトではなく、建築図面に近いエディトリアルな線画に寄せる。
 * ・線幅はすべて 1.3（viewBox 32 基準）で統一し、塗りは使わない
 * ・1アイコンにつき赤は1箇所だけ（役割の核になる部分）
 * ・whileHover/whileFocus/whileTap（親カードの rest / hover variants）で
 *   赤の要素だけがわずかに動く。カード側の開閉Motionには手を入れていない。
 */

const SVG_PROPS = {
  viewBox: "0 0 32 32",
  className: "h-9 w-9",
  fill: "none",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const INK = "var(--color-ink-900)";
const GRAY = "var(--color-ink-500)";
const RED = "var(--color-accent-600)";

export function DepartmentIcon({ effect }: { effect: DepartmentHoverEffect }) {
  switch (effect) {
    // 営業部：人と人の接点。2人の間を赤い線がつなぎ、ホバーで結ばれる。
    case "rising-numbers":
      return (
        <svg {...SVG_PROPS}>
          <circle cx="9" cy="10" r="3.4" stroke={INK} />
          <path d="M3.5 25c0-3.3 2.5-5.6 5.5-5.6s5.5 2.3 5.5 5.6" stroke={INK} />
          <circle cx="23" cy="10" r="3.4" stroke={INK} />
          <path d="M17.5 25c0-3.3 2.5-5.6 5.5-5.6s5.5 2.3 5.5 5.6" stroke={INK} />
          <motion.path
            d="M12.6 15.6h6.8"
            stroke={RED}
            variants={{ rest: { pathLength: 0.45, opacity: 0.75 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          />
          <motion.circle
            cx="16"
            cy="15.6"
            r="1.5"
            stroke={RED}
            variants={{ rest: { scale: 0.8, opacity: 0.8 }, hover: { scale: 1, opacity: 1 } }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          />
        </svg>
      );

    // 事務・管理部門：重なる書類。ホバーで赤い罫線が整列する。
    case "aligning-info":
      return (
        <svg {...SVG_PROPS}>
          <path d="M8.5 7.5h11l4 4v15h-15z" stroke={INK} />
          <path d="M19.5 7.5v4h4" stroke={INK} />
          <path d="M5.5 23V4.5h12" stroke={GRAY} />
          <motion.path
            d="M11.5 17h9"
            stroke={RED}
            variants={{ rest: { pathLength: 0.55, x: 0 }, hover: { pathLength: 1, x: 0 } }}
            transition={{ duration: 0.35, ease: EASE_STANDARD }}
          />
          <motion.path
            d="M11.5 21h9"
            stroke={RED}
            variants={{ rest: { pathLength: 0.3, opacity: 0.6 }, hover: { pathLength: 0.8, opacity: 1 } }}
            transition={{ duration: 0.35, ease: EASE_STANDARD, delay: 0.06 }}
          />
        </svg>
      );

    // 建設事業部：建物と寸法線。ホバーで赤い寸法線が伸びる。
    case "building-lines":
      return (
        <svg {...SVG_PROPS}>
          <path d="M4 24.5h24" stroke={INK} />
          <path d="M7.5 24.5V11l8.5-5.5L24.5 11v13.5" stroke={INK} />
          <path d="M13 24.5V18h6v6.5" stroke={GRAY} />
          <path d="M12 14h8" stroke={GRAY} />
          <motion.g
            stroke={RED}
            style={{ transformOrigin: "16px 28.5px" }}
            variants={{ rest: { scaleX: 0.78, opacity: 0.7 }, hover: { scaleX: 1, opacity: 1 } }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          >
            <path d="M8 28.5h16" />
            <path d="M8 27v3M24 27v3" />
          </motion.g>
        </svg>
      );

    // 解体産廃事業部：重機のアーム。ホバーでバケットが少し下りる。
    case "deconstructing-blocks":
      return (
        <svg {...SVG_PROPS}>
          <path d="M3 27h26" stroke={INK} />
          <path d="M5.5 23.5h11v-6h-11z" stroke={INK} />
          <path d="M8 17.5v-4h6v4" stroke={INK} />
          <path d="M14.5 15.5 23 8.5" stroke={INK} />
          <path d="M23 8.5h4" stroke={GRAY} />
          <motion.path
            d="M24.5 12.5h5l-1 5h-3z"
            stroke={RED}
            variants={{ rest: { y: 0, rotate: 0 }, hover: { y: 2, rotate: -10 } }}
            style={{ transformOrigin: "27px 12.5px" }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          />
        </svg>
      );

    // 財務戦略部：数値の分析。ホバーで赤い推移線が描き切られる。
    case "growing-graph":
      return (
        <svg {...SVG_PROPS}>
          <path d="M5.5 4.5v23h23" stroke={INK} />
          <path d="M10 27.5v-6M15.5 27.5v-10M21 27.5v-5.5M26.5 27.5v-13" stroke={GRAY} />
          <motion.path
            d="M8 20 14 14l5 3.5 8-10"
            stroke={RED}
            variants={{ rest: { pathLength: 0.72, opacity: 0.9 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          />
          <motion.path
            d="M22.5 7.5H27v4.5"
            stroke={RED}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3, ease: EASE_STANDARD, delay: 0.18 }}
          />
        </svg>
      );

    // 社長室：各部門をつなぐ中心。ホバーで外周の点が中心へ寄る。
    case "converging-light":
      return (
        <svg {...SVG_PROPS}>
          <circle cx="16" cy="16" r="11.5" stroke={GRAY} />
          <path d="M16 7.5v4M16 20.5v4M7.5 16h4M20.5 16h4" stroke={INK} />
          <circle cx="16" cy="4.5" r="1.6" stroke={INK} />
          <circle cx="16" cy="27.5" r="1.6" stroke={INK} />
          <circle cx="4.5" cy="16" r="1.6" stroke={INK} />
          <circle cx="27.5" cy="16" r="1.6" stroke={INK} />
          <motion.circle
            cx="16"
            cy="16"
            r="4.5"
            stroke={RED}
            variants={{ rest: { scale: 1, opacity: 0.7 }, hover: { scale: 0.72, opacity: 1 } }}
            style={{ transformOrigin: "16px 16px" }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          />
        </svg>
      );

    default:
      return null;
  }
}
