import type { Variants } from "motion/react";

/** サイト全体で共通利用するイージング・時間の基準値 */
export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

/**
 * 見出しアニメーションは3種類に限定する。
 * - core: 企業理念など、サイトの核となる見出し専用。罫線が伸びてから文字が現れる特別演出。
 *   写真のマスク出現や数字のカウントアップとは異なる見え方にし、他のセクションでは使い回さない。
 * - standard: 通常のセクション見出し。fade + slide-up。
 * - sub: サブ見出しなど軽量な箇所。単純fade。
 */
export const headingVariants: Record<"core" | "standard" | "sub", Variants> = {
  core: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
  standard: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_STANDARD },
    },
  },
  sub: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: EASE_STANDARD },
    },
  },
};

export const maskRevealVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: EASE_STANDARD },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_STANDARD },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
