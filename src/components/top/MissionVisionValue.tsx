"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { mvvBlocks, valuePillars } from "@/data/mvv";
import { SectionDecor, type DecorVariant } from "@/components/ui/SectionDecor";

/** セクションごとの背景色と装飾。MISSIONは白、VISIONは白〜ライトグレー、VALUEはアイボリー。 */
const blockBackgrounds: Record<string, { bg: string; decor: DecorVariant }> = {
  mission: { bg: "bg-[var(--color-paper-000)]", decor: "mission" },
  vision: { bg: "bg-[var(--color-paper-050)]", decor: "vision" },
  value: { bg: "bg-[var(--color-paper-000)]", decor: "value" },
};

function PendingBadge() {
  return (
    <span className="ml-2 shrink-0 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 align-middle text-[10px] font-normal text-[var(--color-paper-050)]">
      確認中
    </span>
  );
}

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
              <motion.p
                variants={fadeUpVariants}
                className="font-heading-en text-[17px] font-light tracking-[0.25em] text-[var(--color-accent-600)] uppercase"
              >
                {block.eyebrow}
              </motion.p>
              <motion.p
                variants={fadeUpVariants}
                className="mt-2 text-xs tracking-[0.2em] text-[var(--color-ink-500)]"
              >
                {block.label}
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                className="font-serif-jp mt-8 text-xl leading-relaxed font-bold text-[var(--color-ink-900)] md:text-3xl md:leading-relaxed"
              >
                {block.statement}
              </motion.p>

              <motion.div variants={fadeUpVariants}>
                {block.body ? (
                  <p className="mx-auto mt-8 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base">
                    {block.body}
                  </p>
                ) : (
                  <p className="mt-8 text-sm text-[var(--color-ink-500)]">
                    本文
                    <PendingBadge />
                  </p>
                )}
              </motion.div>

              {block.id === "value" && (
                <motion.div
                  variants={fadeUpVariants}
                  className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3"
                >
                  {valuePillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-[var(--color-paper-200)] px-6 py-7"
                    >
                      <p className="font-serif-jp text-lg font-bold text-[var(--color-ink-900)]">
                        {pillar.title}
                      </p>
                      {pillar.body ? (
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
                          {pillar.body}
                        </p>
                      ) : (
                        <p className="mt-3 text-xs text-[var(--color-ink-500)]">
                          説明文
                          <PendingBadge />
                        </p>
                      )}
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
