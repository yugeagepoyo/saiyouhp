"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { staggerContainer, fadeUpVariants, EASE_STANDARD } from "@/lib/motion";
import { IntroSplash } from "./IntroSplash";
import { Button } from "@/components/ui/Button";
import { ENTRY_HREF } from "@/data/nav";

/** 区間ごとの線形補間（両端はクランプ） */
function interpolate(p: number, stops: number[], values: number[]) {
  const last = stops.length - 1;
  if (p <= stops[0]) return values[0];
  if (p >= stops[last]) return values[last];
  for (let i = 0; i < last; i++) {
    if (p <= stops[i + 1]) {
      const t = (p - stops[i]) / (stops[i + 1] - stops[i]);
      return values[i] + (values[i + 1] - values[i]) * t;
    }
  }
  return values[last];
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // useTransformの配列版はMotionがWAAPI(ViewTimeline)へ最適化することがあり、
  // sticky内の要素では進捗の基準がずれてopacityが意図しない値になる。
  // 関数版にして主スレッドでの評価に固定する。
  //
  // 1つ目のコピーは、2つ目が現れる前にゆっくりフェードで消しきる。
  const text1Opacity = useTransform(() => interpolate(scrollYProgress.get(), [0.02, 0.3], [1, 0]));
  const text1Y = useTransform(() => interpolate(scrollYProgress.get(), [0.02, 0.3], [0, -30]));

  // 2つ目のコピーは下から現れたあと長めに留まり、最後はフェードしながら下へ下がる。
  const text2Opacity = useTransform(() =>
    interpolate(scrollYProgress.get(), [0.34, 0.46, 0.7, 0.8], [0, 1, 1, 0]),
  );
  const text2Y = useTransform(() =>
    interpolate(scrollYProgress.get(), [0.34, 0.46, 0.7, 0.8], [40, 0, 0, 60]),
  );

  // 縮小しすぎると画像の下に大きな余白が残るため、控えめな縮小に留める。
  // 2つ目のコピーが消えきってから縮小が始まるようにする。
  const videoHeight = useTransform(scrollYProgress, [0.82, 1], ["100%", "72%"]);
  const videoInset = useTransform(scrollYProgress, [0.82, 1], ["0%", "4%"]);
  const videoRadius = useTransform(scrollYProgress, [0.82, 1], ["0px", "20px"]);
  const videoOverlay = useTransform(scrollYProgress, [0.74, 0.94], [0.35, 0.75]);

  return (
    <>
      <IntroSplash />
      <div ref={containerRef} className={reduceMotion ? "relative min-h-[100svh]" : "relative h-[200vh]"}>
        <div
          className={
            reduceMotion ? "relative min-h-[100svh] overflow-hidden" : "sticky top-0 h-screen overflow-hidden"
          }
        >
          <motion.div
            className="absolute overflow-hidden bg-[var(--color-ink-900)]"
            style={
              reduceMotion
                ? { inset: 0 }
                : { top: 0, left: videoInset, right: videoInset, height: videoHeight, borderRadius: videoRadius }
            }
          >
            <Image
              src="/images/top.jpg"
              alt="ノーブデンスの社員たち"
              fill
              priority
              sizes="100vw"
              className="object-contain object-[center_38%] md:object-cover md:object-[center_40%]"
            />
            <motion.div
              className="absolute inset-0 bg-[var(--color-ink-900)]"
              style={{ opacity: reduceMotion ? 0.45 : videoOverlay }}
            />
          </motion.div>

          {/* 入場アニメーション（variants）とスクロール連動のopacityを同じ要素に置くと、
              variants側がopacityを1で上書きしてスクロールでのフェードが効かなくなるため、
              外側＝スクロール連動、内側＝入場アニメーション、と要素を分けている。 */}
          <motion.div
            style={reduceMotion ? undefined : { opacity: text1Opacity, y: text1Y }}
            className="relative mx-auto flex h-full max-w-[var(--container-page)] flex-col justify-end px-6 pt-32 pb-20 text-[var(--color-paper-050)] md:px-10 md:pb-28"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.25, 1.9)}
              className="flex flex-col gap-6"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_STANDARD } },
                }}
                // Motionがtransformを制御しているため、位置調整はtop/leftで行う。
                // 左移動は画面外にはみ出さない幅（1440px以上）でのみ適用する。
                className="font-serif-jp relative -top-[10%] max-w-3xl text-[9vw] leading-[1.15] font-bold tracking-tight min-[1440px]:-left-[10%] md:text-5xl lg:text-6xl"
              >
                社員の永続的な幸福のために
                <br />
                運営し社会に反映していく
              </motion.h1>

              <motion.div variants={fadeUpVariants} className="mt-2 flex flex-col gap-4 sm:flex-row">
                <Button
                  href={ENTRY_HREF}
                  variant="primary"
                  // primaryバリアントのbg-ink-900とクラス生成順で競合するため、!で確実に上書きする。
                  className="!bg-[var(--color-accent-500)] !text-[var(--color-ink-900)] hover:!bg-[var(--color-accent-600)] hover:!text-[var(--color-paper-050)]"
                >
                  ENTRY エントリーする
                </Button>
                <Button href="/about" variant="secondary" className="border-white/50 text-white hover:bg-white hover:text-[var(--color-ink-900)]">
                  ノーブデンスについて
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {!reduceMotion && (
            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
            >
              <p className="font-serif-jp text-2xl leading-relaxed font-medium text-[var(--color-paper-050)] md:text-4xl md:leading-relaxed">
                誇れる仕事を、
                <br />
                誇れる仲間と。
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
