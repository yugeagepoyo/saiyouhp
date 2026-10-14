"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { RevealImage } from "@/components/ui/RevealImage";
import { EASE_STANDARD } from "@/lib/motion";

export interface InterviewItem {
  /** 質問文 */
  question: string;
  /** 回答。空行区切りで段落に分ける。 */
  answer: string;
}

export interface InterviewProfile {
  name: string;
  nameEn?: string;
  kana?: string;
  /** 「第二営業部 / 主任」のように整形済みの所属・役職 */
  affiliation?: string;
  joinYear?: string;
  photoSrc?: string;
  photoLabel: string;
  isSample?: boolean;
}

/** 空行で区切られた原文を、そのままの文章で段落に分けて表示する。 */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((paragraph) => (
          <p
            key={paragraph}
            className="jp-pretty mt-5 text-center text-sm leading-[2.05] text-[var(--color-ink-700)] first:mt-0 md:text-base"
          >
            {paragraph}
          </p>
        ))}
    </>
  );
}

/** スクロールに合わせて順番に現れる1問分のブロック。 */
function QaBlock({ item, no }: { item: InterviewItem; no: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE_STANDARD }}
    >
      <p className="font-heading-en text-center text-sm tracking-[0.25em] text-[var(--color-accent-600)]">
        {String(no).padStart(2, "0")}
      </p>
      <h2 className="font-serif-jp mt-3 text-center text-xl leading-snug font-bold text-[var(--color-ink-900)] md:text-2xl">
        {item.question}
      </h2>
      <div className="mt-7 md:mt-8">
        <Paragraphs text={item.answer} />
      </div>
    </motion.div>
  );
}

/**
 * 社員インタビュー詳細。
 * 上部は「左：写真／右：氏名・所属」の2カラム（スマートフォンは1カラム）、
 * その下に本文ブロックを中央に置く。本文自体は左揃えで読みやすさを優先する。
 */
export function InterviewArticle({
  profile,
  items,
}: {
  profile: InterviewProfile;
  items: InterviewItem[];
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const meta = [
    profile.affiliation ?? "",
    // 「2024年」のような年表記のときだけ「入社年」のラベルを添える。
    profile.joinYear
      ? profile.joinYear.includes("年")
        ? `入社年 ${profile.joinYear.replace(/入社$/, "")}`
        : profile.joinYear
      : "",
  ].filter(Boolean);

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_STANDARD }}
          >
            {/* 詳細ページの写真はフルカラー。角丸は付けない。 */}
            <RevealImage
              alt={profile.name}
              label={profile.photoLabel}
              src={profile.photoSrc}
              aspectClassName="aspect-[3/4]"
              revealOnMount
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.25,
              ease: EASE_STANDARD,
            }}
          >
            {profile.isSample && (
              <span className="mb-5 inline-block bg-[var(--color-accent-500)]/25 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                サンプル
              </span>
            )}
            <h1 className="font-serif-jp text-4xl leading-tight font-bold text-[var(--color-ink-900)] md:text-5xl lg:text-[3.5rem]">
              {profile.name}
            </h1>
            {(profile.nameEn || profile.kana) && (
              <p className="font-heading-en mt-4 text-xs tracking-[0.28em] text-[var(--color-ink-500)] uppercase md:text-sm">
                {profile.nameEn ?? profile.kana}
              </p>
            )}

            <span
              aria-hidden
              className="mt-8 block h-px w-16 bg-[var(--color-accent-600)] md:mt-10 md:w-20"
            />

            {meta.length > 0 && (
              <dl className="mt-8 space-y-2 md:mt-10">
                {meta.map((line) => (
                  <dd key={line} className="text-sm text-[var(--color-ink-700)] md:text-base">
                    {line}
                  </dd>
                ))}
              </dl>
            )}
          </motion.div>
        </div>
      </section>

      {items.length > 0 && (
        <section className="pb-20 md:pb-28">
          {/* ブロック自体は中央に置き、本文は左揃えのまま読ませる。 */}
          <div className="mx-auto w-full max-w-[860px] space-y-16 px-6 md:space-y-24 md:px-10">
            {items.map((item, i) => (
              <QaBlock key={item.question} item={item} no={i + 1} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
