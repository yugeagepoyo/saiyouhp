"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { maskRevealVariants } from "@/lib/motion";
import { PlaceholderImage } from "./PlaceholderImage";

interface RevealImageProps {
  alt: string;
  label?: string;
  /** 実画像のパス。未指定の場合はラベル付きプレースホルダーを表示する。 */
  src?: string;
  aspectClassName?: string;
  parallax?: boolean;
  className?: string;
  /** true の場合、画面内検知を待たずマウント時に即座に現れる。 */
  revealOnMount?: boolean;
}

/** スクロールでマスクの中から写真が現れる表現。将来的に next/image と差し替え可能。 */
export function RevealImage({
  alt,
  label,
  src,
  aspectClassName = "aspect-[4/5]",
  parallax = false,
  className = "",
  revealOnMount = false,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 画面内判定は、マスクをかける要素ではなく外側のコンテナで行う。
  // マスク要素は初期状態が clip-path: inset(100%) で描画面積が実質ゼロのため、
  // そこに whileInView を付けると交差が検知されず、写真が出ないままになる箇所がある
  // （同じページ内でも表示される箇所とされない箇所が出る）。
  // コンテナはクリップされないため確実に検知できる。
  const inView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !reduceMotion ? ["-6%", "6%"] : ["0%", "0%"],
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectClassName} ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? "visible" : "hidden"}
        animate={reduceMotion || revealOnMount || inView ? "visible" : "hidden"}
        variants={maskRevealVariants}
      >
        <motion.div style={{ y }} className="absolute inset-[-6%]">
          <PlaceholderImage alt={alt} label={label} src={src} />
        </motion.div>
      </motion.div>
    </div>
  );
}
