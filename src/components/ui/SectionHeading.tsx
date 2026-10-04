"use client";

import { motion } from "motion/react";
import { headingVariants } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "standard" | "sub";
  as?: "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

/**
 * 通常のセクション見出し(standard: fade+slide-up) / サブ見出し(sub: 単純fade)。
 * 企業理念専用の特別演出は CoreHeading コンポーネントを使用する。
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  variant = "standard",
  as = "h2",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={headingVariants[variant]}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 font-heading-en text-[17px] font-light tracking-[0.2em] text-[var(--color-accent-600)] uppercase">
          {eyebrow}
        </p>
      )}
      <Tag
        className={
          as === "h2"
            ? "font-serif-jp text-3xl leading-tight font-bold tracking-tight md:text-4xl"
            : "font-serif-jp text-xl leading-snug font-bold md:text-2xl"
        }
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-700)] md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
