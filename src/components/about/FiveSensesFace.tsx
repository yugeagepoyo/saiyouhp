"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EASE_STANDARD } from "@/lib/motion";

interface SenseSpot {
  id: string;
  /** 顔のパーツ名（目・耳・鼻・口・手） */
  partLabel: string;
  /** 五感名（視覚・聴覚・嗅覚・味覚・触覚） */
  label: string;
  text: string;
  images: { label: string; src?: string }[];
  /** 顔イラスト上のクリック領域。中心座標・半径ともに画像に対する% */
  hotspot: { cx: number; cy: number; rx: number; ry: number };
}

const spots: SenseSpot[] = [
  {
    id: "sight",
    partLabel: "目",
    label: "視覚",
    text: "居心地の良いオフィスデザインで、気持ちよく働ける空間づくりをしています。",
    images: [{ label: "視覚 写真1（仮）" }, { label: "視覚 写真2（仮）" }],
    hotspot: { cx: 51, cy: 32, rx: 20, ry: 6 },
  },
  {
    id: "hearing",
    partLabel: "耳",
    label: "聴覚",
    text: "集中とコミュニケーションを両立できる、心地よい音環境に配慮しています。",
    images: [{ label: "聴覚 写真1（仮）" }, { label: "聴覚 写真2（仮）" }],
    hotspot: { cx: 79, cy: 41, rx: 9, ry: 8 },
  },
  {
    id: "smell",
    partLabel: "鼻",
    label: "嗅覚",
    text: "オフィス内のリフレッシュスペースで、気分転換できる香りや空間を用意しています。",
    images: [{ label: "嗅覚 写真1（仮）" }, { label: "嗅覚 写真2（仮）" }],
    hotspot: { cx: 50, cy: 41, rx: 8, ry: 7 },
  },
  {
    id: "taste",
    partLabel: "口",
    label: "味覚",
    text: "ドリンクや軽食を用意し、休憩時間も楽しく過ごせるようにしています。",
    images: [{ label: "味覚 写真1（仮）" }, { label: "味覚 写真2（仮）" }],
    hotspot: { cx: 51, cy: 49, rx: 9, ry: 5.5 },
  },
  {
    id: "touch",
    partLabel: "手",
    label: "触覚",
    text: "働きやすい什器・設備を整え、日々の作業の快適さにもこだわっています。",
    images: [{ label: "触覚 写真1（仮）" }, { label: "触覚 写真2（仮）" }],
    hotspot: { cx: 68, cy: 57, rx: 14, ry: 13 },
  },
];

/**
 * 五感で楽しむ職場づくり。顔のイラストに透明なhotspotを重ね、
 * 目・耳・鼻・口・手をクリック／タップすると対応する五感の写真・説明に切り替わる。
 * hotspotだけに操作を依存しないよう、顔の下に補助ナビゲーション（従来のボタンUI）も残している。
 */
export function FiveSensesFace() {
  const [activeId, setActiveId] = useState(spots[0].id);
  const [imageIndex, setImageIndex] = useState(0);
  const activeSpot = spots.find((s) => s.id === activeId)!;
  const activeImage = activeSpot.images[imageIndex] ?? activeSpot.images[0];

  function select(id: string) {
    if (id === activeId) return;
    setActiveId(id);
    setImageIndex(0);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-center text-xs text-[var(--color-ink-500)] lg:text-left">
        顔の各パーツをクリックして、五感へのこだわりをご覧ください
      </p>

      <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
        {/* 顔イラスト + hotspot + 補助ナビゲーション */}
        <div className="mx-auto flex w-full max-w-[320px] flex-col items-center lg:mx-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src="/images/face.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 320px, 340px"
              className="pointer-events-none object-contain select-none"
            />
            {spots.map((spot) => {
              const isActive = spot.id === activeId;
              return (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={`${spot.label}（${spot.partLabel}）を選択`}
                  aria-pressed={isActive}
                  onClick={() => select(spot.id)}
                  className="group absolute flex cursor-pointer items-center justify-center rounded-full outline-none"
                  style={{
                    left: `${spot.hotspot.cx}%`,
                    top: `${spot.hotspot.cy}%`,
                    width: `${spot.hotspot.rx * 2}%`,
                    height: `${spot.hotspot.ry * 2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* hover / focus 時のアクセント強調（PCのみ想定、タップには依存しない） */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[var(--color-accent-500)]/0 ring-2 ring-[var(--color-accent-500)]/0 transition-colors duration-200 group-hover:bg-[var(--color-accent-500)]/15 group-hover:ring-[var(--color-accent-500)]/40 group-focus-visible:bg-[var(--color-accent-500)]/15 group-focus-visible:ring-[var(--color-accent-500)]/40"
                  />
                  {/* 選択中のアクセント円（選択が切り替わるたびに軽くポップする） */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        aria-hidden
                        key="active-ring"
                        className="absolute inset-0 rounded-full bg-[var(--color-accent-500)]/20 ring-2 ring-[var(--color-accent-600)]"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.35, ease: EASE_STANDARD }}
                      />
                    )}
                  </AnimatePresence>
                  {/* hover時のみ表示する小ラベル */}
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-ink-900)] px-2.5 py-1 text-[11px] whitespace-nowrap text-[var(--color-paper-050)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {spot.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 補助ナビゲーション：顔のhotspotだけに操作を依存させないための代替導線。
              上段2個・下段3個の2段構成にし、各段を中央揃えにしている。 */}
          <div className="mt-6 flex flex-col items-center gap-2">
            {[spots.slice(0, 2), spots.slice(2, 5)].map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2">
                {row.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => select(spot.id)}
                      aria-pressed={isActive}
                      className="relative"
                    >
                      <motion.span
                        animate={{ scale: isActive ? 1.08 : 1 }}
                        transition={{ duration: 0.3, ease: EASE_STANDARD }}
                        className={`flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-sm ${
                          isActive
                            ? "bg-[var(--color-ink-900)] text-[var(--color-paper-050)]"
                            : "bg-[var(--color-paper-100)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]"
                        }`}
                      >
                        {spot.label}
                      </motion.span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 写真・説明 */}
        <div className="mx-auto w-full max-w-md text-center lg:mx-0 lg:text-left">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSpot.id}-${imageIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_STANDARD }}
              >
                <PlaceholderImage alt={`${activeSpot.label}のイメージ`} label={activeImage.label} src={activeImage.src} />
              </motion.div>
            </AnimatePresence>
          </div>

          {activeSpot.images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 lg:justify-start">
              {activeSpot.images.map((img, i) => (
                <button
                  key={img.label}
                  type="button"
                  aria-label={`${activeSpot.label}の写真${i + 1}を表示`}
                  onClick={() => setImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === imageIndex ? "w-6 bg-[var(--color-accent-600)]" : "w-1.5 bg-[var(--color-paper-200)]"
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpot.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_STANDARD }}
            >
              <p className="mt-6 font-display text-lg text-[var(--color-ink-900)]">{activeSpot.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{activeSpot.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
