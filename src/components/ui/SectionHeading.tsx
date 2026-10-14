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
 * セクション見出し。
 * 大きな英字タイトル → 日本語の見出し → 説明文、の順に積む。
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
  const centered = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={headingVariants[variant]}
      className={`${centered ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="font-heading-en text-[clamp(1.75rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.01em] text-[var(--color-ink-900)] uppercase">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-serif-jp ${eyebrow ? "mt-5 md:mt-6" : ""} ${
          as === "h2"
            ? "text-2xl leading-snug font-bold md:text-3xl"
            : "text-xl leading-snug font-bold md:text-2xl"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`jp-pretty mt-5 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
