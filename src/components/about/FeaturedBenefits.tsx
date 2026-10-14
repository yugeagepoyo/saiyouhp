"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";
import type { BenefitImage, FeaturedBenefit } from "@/data/benefits";

/** 写真が複数ある項目の切り替え間隔（ms） */
const SLIDE_INTERVAL_MS = 4500;
/** クロスフェードの時間（秒）。急に入れ替わらないよう、ゆっくり重ねて切り替える。 */
const FADE_S = 1.2;

/**
 * 円形の写真。1枚なら固定表示、2枚以上なら自動クロスフェードで切り替える。
 * 常時フルカラー（モノクロフィルターは掛けない）。
 */
function BenefitPhotos({ images, alt }: { images: BenefitImage[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const total = images.length;

  useEffect(() => {
    if (total <= 1 || reduceMotion) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % total), SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [total, reduceMotion]);

  const current = images[index % total];

  return (
    <AnimatePresence>
      <motion.div
        key={current.src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : FADE_S, ease: "easeInOut" }}
      >
        <Image
          src={current.src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 80vw, 360px"
          className="object-cover"
          style={current.objectPosition ? { objectPosition: current.objectPosition } : undefined}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * 写真で紹介する福利厚生。
 * すべて同じ大きさの円形写真に統一し、写真＋項目名を1セットとして整列させる。
 */
function Item({ benefit, index }: { benefit: FeaturedBenefit; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const images = benefit.images ?? [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE_STANDARD,
      }}
      className="flex flex-col items-center"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full">
        {images.length > 0 ? (
          <BenefitPhotos images={images} alt={benefit.label} />
        ) : (
          <div
            role="img"
            aria-label={benefit.label}
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-ink-700)_0%,var(--color-ink-900)_60%)] px-6 text-center text-xs tracking-[0.15em] text-[var(--color-paper-100)]/70 uppercase"
          >
            {benefit.imageLabel}
          </div>
        )}
      </div>
      <p className="mt-6 text-center text-base font-bold text-[var(--color-ink-900)] md:text-lg">
        {benefit.label}
      </p>
    </motion.div>
  );
}

export function FeaturedBenefits({ benefits }: { benefits: FeaturedBenefit[] }) {
  return (
    // PCは2列×2行。円の大きさ・項目名の位置がすべて揃うよう、同じ枠を並べる。
    <div className="mx-auto grid max-w-[18rem] grid-cols-1 gap-x-12 gap-y-12 sm:max-w-2xl sm:grid-cols-2 md:max-w-3xl md:gap-x-16 md:gap-y-14">
      {benefits.map((b, i) => (
        <Item key={b.id} benefit={b} index={i} />
      ))}
    </div>
  );
}
