"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { mvvBlocks, valuePillars, mvvLead } from "@/data/mvv";
import { SectionDecor, type DecorVariant } from "@/components/ui/SectionDecor";

/**
 * セクションごとの背景色と装飾。MISSIONは白、VISIONは白〜ライトグレー、VALUEは白。
 * 色は section-blend（globals.css）で上下端を透過させて敷くため、
 * 隣のセクションとの境界に色の切れ目ができない。
 */
const blockBackgrounds: Record<string, { bg: string; decor: DecorVariant }> = {
  mission: { bg: "section-blend blend-paper-000", decor: "mission" },
  vision: { bg: "section-blend blend-paper-050", decor: "vision" },
  value: { bg: "section-blend blend-paper-000", decor: "value" },
};

/**
 * Mission / Vision / Value。
 * PCでは1セクション＝1画面とし、CSSスクロールスナップ（globals.css の
 * html { scroll-snap-type: y proximity }）で次のセクションへ自然に吸着させる。
 * スマートフォンでは min-height を抑え、通常スクロールを優先する。
 */
export function MissionVisionValue() {
  return (
    <>
      {mvvBlocks.map((block, index) => (
        <section
          key={block.id}
          id={index === 0 ? "mvv" : block.id}
          className={`relative flex scroll-mt-20 items-center overflow-hidden py-24 md:min-h-screen md:snap-start md:py-28 ${
            blockBackgrounds[block.id]?.bg ?? ""
          }`}
        >
          {blockBackgrounds[block.id] && <SectionDecor variant={blockBackgrounds[block.id].decor} />}
          <Container className="relative max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer(0.14)}
              className="text-center"
            >
              {index === 0 && (
                <motion.p
                  variants={fadeUpVariants}
                  className="mb-8 text-sm tracking-[0.1em] text-[var(--color-ink-700)] md:mb-10 md:text-base"
                >
                  {mvvLead}
                </motion.p>
              )}
              <motion.p
                variants={fadeUpVariants}
                className="font-heading-en text-[clamp(2.65rem,9vw,4rem)] leading-none font-light tracking-[0.14em] text-[var(--color-accent-600)] uppercase"
              >
                {block.eyebrow}
              </motion.p>
              {/* 英字見出しの下に引く赤い罫線 */}
              <motion.span
                aria-hidden
                variants={fadeUpVariants}
                className="mx-auto mt-6 block h-px w-24 bg-[var(--color-accent-600)] md:mt-7 md:w-32"
              />

              <motion.p
                variants={fadeUpVariants}
                className="jp-balance font-serif-jp mt-8 text-xl leading-relaxed font-bold text-[var(--color-ink-900)] md:text-3xl md:leading-relaxed"
              >
                {block.statement}
              </motion.p>

              {block.body && (
                <motion.p
                  variants={fadeUpVariants}
                  className="jp-pretty mx-auto mt-8 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base"
                >
                  {block.body}
                </motion.p>
              )}

              {block.id === "value" && (
                <motion.div
                  variants={fadeUpVariants}
                  className="mt-12 flex flex-col items-center gap-5 sm:mx-auto sm:w-fit sm:items-stretch"
                >
                  {/* 3つを縦に積み、PCでは1項目＝1行に収める。
                      見出しの幅を揃えることで、本文の開始位置も縦に揃う。
                      スマートフォンは1行に収まらないため折り返す（jp-balanceで行長を整える）。 */}
                  {valuePillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="flex flex-col items-center gap-1 sm:flex-row sm:items-baseline sm:gap-5"
                    >
                      <p className="font-serif-jp shrink-0 text-base font-bold text-[var(--color-ink-900)] sm:w-16 sm:text-right md:text-lg">
                        {pillar.title}
                      </p>
                      <p className="jp-balance text-sm leading-relaxed text-[var(--color-ink-700)] sm:text-left sm:whitespace-nowrap">
                        {pillar.body}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </Container>
        </section>
      ))}
    </>
  );
}
