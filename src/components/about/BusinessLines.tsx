"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * 事業内容。4事業を1つずつ大きく見せる。
 *
 * ・左にテキスト、右に写真（ブロックごとに左右を入れ替える）
 * ・写真はモノクロの長方形。左上に細い赤のコーナーを添えるだけの構成にする
 * ・番号は「BUSINESS / 01」として見出しの上に置く
 */

interface BusinessLine {
  no: string;
  title: string;
  text: string;
  imageLabel: string;
  /** 共有済みの写真。未着の事業はプレースホルダーのまま。 */
  imageSrc?: string;
}

const businessLines: BusinessLine[] = [
  {
    no: "01",
    title: "不動産事業",
    text: "物件の売買・仲介を通じて、お客様に最適な選択肢をご提案します。",
    imageLabel: "不動産事業の写真（物件・商談など）",
    imageSrc: "/images/business/real-estate.jpg",
  },
  {
    no: "02",
    title: "建設事業",
    text: "確かな技術と品質管理で、物件の価値をかたちにします。",
    imageLabel: "建設事業の写真（施工現場・建築物など）",
    imageSrc: "/images/business/construction.jpg",
  },
  {
    no: "03",
    title: "解体事業",
    text: "安全第一で解体工事を行い、次の土地活用の可能性を拓きます。",
    imageLabel: "解体事業の写真（重機・解体現場など）",
    imageSrc: "/images/business/demolition.jpg",
  },
  {
    no: "04",
    title: "産業廃棄物収集運搬事業",
    text: "適正な処理・運搬体制で、環境と地域社会に配慮した事業を行います。",
    imageLabel: "産業廃棄物収集運搬事業の写真（運搬車両・処理など）",
    imageSrc: "/images/business/industrial-waste.jpg",
  },
];

function BusinessBlock({ line, index }: { line: BusinessLine; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const shown = inView || reduceMotion;
  const dur = (s: number) => (reduceMotion ? 0 : s);

  // パララックスはごく弱く。写真がわずかに遅れて動く程度に留める。
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-2.5%", "2.5%"]);

  // 偶数ブロックは写真が右、奇数ブロックは写真が左。
  const photoRight = index % 2 === 0;

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
      <div className={photoRight ? "md:order-1" : "md:order-2"}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: dur(0.7), ease: EASE_STANDARD }}
          className="font-heading-en text-sm tracking-[0.25em] text-[var(--color-accent-600)]"
        >
          BUSINESS / {line.no}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: dur(0.8), delay: dur(0.12), ease: EASE_STANDARD }}
          className="font-serif-jp mt-8 text-3xl leading-tight font-bold text-[var(--color-ink-900)] md:text-5xl"
        >
          {line.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: dur(0.8), delay: dur(0.3), ease: EASE_STANDARD }}
          className="jp-pretty mt-8 max-w-md text-sm leading-loose text-[var(--color-ink-700)] md:text-base"
        >
          {line.text}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={shown ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: dur(1), ease: EASE_STANDARD }}
        className={photoRight ? "md:order-2" : "md:order-1"}
      >
        <div className="relative">
          {/* 写真の左上に添える細い赤のコーナー */}
          <span
            aria-hidden
            className="absolute -top-4 -left-4 h-14 w-14 border-t border-l border-[var(--color-accent-600)] md:-top-5 md:-left-5 md:h-20 md:w-20"
          />
          <div className="photo-mono relative aspect-[16/10] overflow-hidden">
            <motion.div style={{ y: parallaxY }} className="absolute inset-[-4%]">
              <PlaceholderImage alt={line.title} label={line.imageLabel} src={line.imageSrc} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function BusinessLines() {
  return (
    <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
      {businessLines.map((line, i) => (
        <BusinessBlock key={line.no} line={line} index={i} />
      ))}
    </div>
  );
}
