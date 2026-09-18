"use client";

import { motion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * 企業理念など、サイトの核となるメッセージ専用の見出し演出。
 * 罫線が伸びてから文字が現れる、他セクションでは使わない特別なアニメーション。
 * 写真のマスク出現・数字のカウントアップとは意図的に異なる見せ方にしている。
 */
export function CoreHeading({
  eyebrow,
  catchphrase,
  body,
}: {
  eyebrow: string;
  catchphrase: string;
  body: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="text-center"
    >
      <motion.p
        className="mb-6 font-display text-xs tracking-[0.3em] text-[var(--color-accent-600)] uppercase"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
      >
        {eyebrow}
      </motion.p>

      <motion.span
        aria-hidden
        className="mx-auto mb-8 block h-px w-16 origin-center bg-[var(--color-accent-500)]"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE_STANDARD } },
        }}
      />

      <motion.p
        className="font-serif-jp text-2xl leading-relaxed font-medium tracking-wide text-[var(--color-ink-900)] md:text-4xl md:leading-relaxed"
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE_STANDARD, delay: 0.3 },
          },
        }}
      >
        「{catchphrase}」
      </motion.p>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.7, delay: 0.7 } },
        }}
      >
        {body}
      </motion.p>
    </motion.div>
  );
}
