"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EASE_STANDARD } from "@/lib/motion";
import type { Office } from "@/data/offices";

/**
 * オフィス紹介。
 *
 * 通常は3拠点の外観を横並びで見せ、1つ選ぶと
 * ・選んだ写真が左へ滑らかに移動
 * ・他の2拠点はフェードアウト
 * ・右側に住所と室内写真の詳細が現れる
 * という流れで切り替える。
 *
 * 横一列のflexを保ったまま各列の flex-basis だけを動かすことで移動を表現している
 * （グリッドの列数を入れ替えるとレイアウトが飛んでしまうため）。
 * スマートフォンでは選んだカードの直下に詳細を開く。
 */

const COLUMN_GAP = "pr-8";

function Photo({
  src,
  label,
  alt,
  aspect = "aspect-[4/5]",
  mono = true,
}: {
  src?: string;
  label: string;
  alt: string;
  aspect?: string;
  /** 一覧の外観はモノクロ。詳細を開いている間は外観・室内ともフルカラーにする。 */
  mono?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${mono ? "photo-mono " : ""}${aspect}`}>
      <PlaceholderImage alt={alt} label={label} src={src} />
    </div>
  );
}

/**
 * 室内写真。複数ある場合はメイン1枚＋下のサムネイルで切り替える。
 * カルーセルらしい装飾は付けず、写真を大きく見せることを優先する。
 */
function InteriorPhotos({
  office,
  reduceMotion,
  fillHeight = false,
}: {
  office: Office;
  reduceMotion: boolean;
  /** PCでは左の外観写真と下端を揃えるため、残りの高さいっぱいに写真を伸ばす。 */
  fillHeight?: boolean;
}) {
  // 別のオフィスを開いたときは1枚目に戻したいので、呼び出し側で key={office.id} を付けている。
  const [index, setIndex] = useState(0);
  const srcs = office.interiorSrcs ?? [];

  if (srcs.length === 0) {
    return (
      <Photo
        label={office.interiorLabel}
        alt={`${office.name}の室内`}
        aspect={fillHeight ? "h-full min-h-[12rem]" : "aspect-[4/3]"}
        mono={false}
      />
    );
  }

  const current = srcs[Math.min(index, srcs.length - 1)];

  return (
    <div className={fillHeight ? "flex h-full flex-col" : undefined}>
      <div
        className={`relative overflow-hidden ${
          fillHeight ? "min-h-[12rem] flex-1" : "aspect-[4/3]"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE_STANDARD }}
          >
            <Image
              src={current}
              alt={`${office.name}の室内`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {srcs.length > 1 && (
        <div className="mt-3 flex shrink-0 gap-3">
          {srcs.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${office.name}の室内写真${i + 1}を表示`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`relative aspect-[4/3] w-24 overflow-hidden transition-opacity ${
                i === index
                  ? "opacity-100 outline outline-[var(--color-accent-600)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OfficeShowcase({ offices }: { offices: Office[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const active = offices.find((o) => o.id === activeId) ?? null;
  const dur = (s: number) => (reduceMotion ? 0 : s);
  const move = { duration: dur(0.75), ease: EASE_STANDARD };

  return (
    <div className="mt-12">
      {/* ------------------------------------------------------------ PC */}
      <div className="hidden md:flex md:items-stretch">
        {offices.map((office) => {
          const isActive = active?.id === office.id;
          const collapsed = active !== null && !isActive;
          return (
            <motion.div
              key={office.id}
              animate={{
                flexBasis: active ? (isActive ? "42%" : "0%") : "33.3333%",
                opacity: collapsed ? 0 : 1,
              }}
              transition={move}
              style={{ flexGrow: 0, flexShrink: 0 }}
              className={`overflow-hidden ${collapsed ? "pointer-events-none" : ""}`}
            >
              <div className={COLUMN_GAP}>
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? null : office.id)}
                  aria-expanded={isActive}
                  className="group block w-full text-left"
                >
                  <Photo
                    src={office.exteriorSrc}
                    label={office.exteriorLabel}
                    alt={`${office.name}の外観`}
                    mono={!isActive}
                  />
                  <p className="mt-5 text-base font-bold whitespace-nowrap text-[var(--color-ink-900)] transition-colors group-hover:text-[var(--color-accent-600)]">
                    {office.name}
                  </p>
                  {!isActive && (
                    <p className="mt-1 text-xs whitespace-nowrap text-[var(--color-ink-500)]">詳しく見る →</p>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          animate={{ flexBasis: active ? "58%" : "0%", opacity: active ? 1 : 0 }}
          transition={move}
          style={{ flexGrow: 0, flexShrink: 0 }}
          className="overflow-hidden"
          aria-hidden={!active}
        >
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: dur(0.5), delay: dur(0.2), ease: EASE_STANDARD }}
                className="relative flex h-full flex-col"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="閉じる"
                  className="absolute top-0 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] text-[var(--color-ink-700)] transition-colors hover:border-[var(--color-accent-500)] hover:text-[var(--color-accent-600)]"
                >
                  ×
                </button>
                <p className="font-serif-jp text-2xl font-bold text-[var(--color-ink-900)]">{active.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{active.address}</p>
                <div className="mt-6 min-h-0 flex-1">
                  <InteriorPhotos
                    key={active.id}
                    office={active}
                    reduceMotion={reduceMotion}
                    fillHeight
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* -------------------------------------------------- スマートフォン */}
      <div className="space-y-10 md:hidden">
        {offices.map((office) => {
          const isActive = active?.id === office.id;
          return (
            <div key={office.id}>
              <button
                type="button"
                onClick={() => setActiveId(isActive ? null : office.id)}
                aria-expanded={isActive}
                className="block w-full text-left"
              >
                <Photo
                  src={office.exteriorSrc}
                  label={office.exteriorLabel}
                  alt={`${office.name}の外観`}
                  mono={!isActive}
                />
                <p className="mt-4 text-base font-bold text-[var(--color-ink-900)]">{office.name}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                  {isActive ? "閉じる ×" : "詳しく見る →"}
                </p>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: dur(0.55), ease: EASE_STANDARD }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5">
                      <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{office.address}</p>
                      <div className="mt-4">
                        <InteriorPhotos key={office.id} office={office} reduceMotion={reduceMotion} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
