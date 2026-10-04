"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * エントリー完了画面。
 * 上部に薄い赤の巨大な「THANK YOU」を1つだけ置き、
 * 装飾はそれと赤の細いラインに絞って余白で見せる。
 * 文字サイズは vw 基準なので、どの画面幅でも見切れずに収まる。
 */
export function ThanksMessage() {
  const reduceMotion = useReducedMotion() ?? false;
  const dur = (s: number) => (reduceMotion ? 0 : s);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(1), ease: EASE_STANDARD }}
        className="font-heading-en pointer-events-none mb-10 text-center text-[15vw] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap text-[var(--color-accent-500)] select-none md:mb-14"
      >
        THANK YOU
      </motion.p>

      <Container className="relative max-w-xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur(0.6), ease: EASE_STANDARD }}
          className="font-heading-en text-[15px] tracking-[0.3em] text-[var(--color-accent-600)] uppercase"
        >
          Entry Received
        </motion.p>

        {/* 細い赤ラインが左から右へ伸びる */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: dur(0.9), delay: dur(0.25), ease: EASE_STANDARD }}
          className="mx-auto mt-5 block h-px w-[134px] origin-left bg-[var(--color-accent-600)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(0.35), ease: EASE_STANDARD }}
          className="font-serif-jp mt-10 text-2xl leading-[1.5] font-bold text-balance text-[var(--color-ink-900)] md:text-3xl"
        >
          {/* 「ます」だけが行末に残らないよう、狭い画面では語の区切りで改行する */}
          エントリー
          <br className="sm:hidden" />
          ありがとうございます
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(0.5), ease: EASE_STANDARD }}
          className="mt-8 text-sm leading-loose text-balance text-[var(--color-ink-700)]"
        >
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          確認メールもあわせてご確認ください。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur(0.6), delay: dur(0.7), ease: EASE_STANDARD }}
          className="mt-16"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-4 border-b border-[var(--color-ink-300)] pb-2 text-sm text-[var(--color-ink-900)] transition-colors hover:border-[var(--color-accent-600)] hover:text-[var(--color-accent-600)]"
          >
            TOPページへ戻る
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
