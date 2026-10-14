"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { RevealImage } from "@/components/ui/RevealImage";
import { EASE_STANDARD } from "@/lib/motion";
import type { CeoLeader } from "@/data/leaders";

/**
 * 代表メッセージ。部門長カードより明確に大きく、PCでは画面幅の8割強を使う。
 * 左に大きな縦写真、右に役職・氏名・メッセージ・自筆署名を置き、
 * 囲みを作らず雑誌の代表メッセージページのように見せる。
 */
export function CeoMessage({ ceo }: { ceo: CeoLeader }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shown = inView || reduceMotion;

  return (
    <div ref={ref} className="mx-auto w-full lg:w-[92%]">
      {/* 写真の上下端とテキスト一式の上下位置が揃うよう、PCでは両カラムを伸縮させる。 */}
      <div className="grid items-stretch gap-10 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={shown ? { opacity: 1 } : undefined}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_STANDARD }}
          className="md:h-full"
        >
          <div className="relative md:h-full">
            {/* 事業内容セクションと同じ赤い角のアクセント。囲みは作らず、品よく主役を示す。 */}
            <span
              aria-hidden
              className="absolute -top-4 -left-4 h-14 w-14 border-t border-l border-[var(--color-accent-600)] md:-top-6 md:-left-6 md:h-24 md:w-24"
            />
            <RevealImage
              alt={`${ceo.role} ${ceo.name}`}
              label={ceo.photoLabel}
              src={ceo.photoSrc}
              aspectClassName="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[30rem]"
              className="photo-mono"
              parallax
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.15,
            ease: EASE_STANDARD,
          }}
        >
          <p className="text-xs tracking-[0.18em] text-[var(--color-accent-600)] md:text-sm">
            {ceo.role}
          </p>
          <p className="font-serif-jp mt-3 text-4xl leading-tight font-bold text-[var(--color-ink-900)] md:text-5xl lg:text-[3.5rem]">
            {ceo.name}
          </p>
          <p className="font-heading-en mt-3 text-xs tracking-[0.2em] text-[var(--color-ink-500)] uppercase md:text-sm">
            {ceo.nameEn}
          </p>

          <span
            aria-hidden
            className="mt-7 block h-px w-16 bg-[var(--color-accent-600)] md:mt-9 md:w-20"
          />

          {/* 一文ずつ読めるよう、段落ごとに広めの行間で積む。 */}
          <div className="mt-7 space-y-5 md:mt-8 md:space-y-6">
            {ceo.message.map((paragraph) => (
              <p
                key={paragraph}
                className="jp-pretty font-serif-jp text-[15px] leading-[2.05] text-[var(--color-ink-900)] md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {ceo.signatureSrc && (
            // 署名画像に氏名が入っているため、横には役職だけを小さく添える。
            <div className="mt-10 flex items-end justify-end gap-4 md:mt-12">
              <span className="pb-1 text-[11px] tracking-[0.16em] text-[var(--color-ink-500)]">
                代表取締役
              </span>
              <Image
                src={ceo.signatureSrc}
                alt={`${ceo.name} の署名`}
                width={500}
                height={100}
                className="h-auto w-[150px] object-contain md:w-[180px]"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
