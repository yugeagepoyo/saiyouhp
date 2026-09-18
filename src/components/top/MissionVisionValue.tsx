"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { mvvBlocks, valuePillars } from "@/data/mvv";

function PendingBadge() {
  return (
    <span className="ml-2 shrink-0 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 align-middle text-[10px] font-normal text-[var(--color-paper-050)]">
      確認中
    </span>
  );
}

/** Mission / Vision / Value。3つのブロックを縦に並べ、Valueの下に3つの柱を置く。 */
export function MissionVisionValue() {
  return (
    <section id="mvv" className="scroll-mt-20 py-20 md:py-28">
      <Container className="max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.14)}
          className="flex flex-col gap-16 md:gap-20"
        >
          {mvvBlocks.map((block) => (
            <motion.div key={block.id} variants={fadeUpVariants} className="text-center">
              <p className="font-display text-sm tracking-[0.25em] text-[var(--color-accent-600)] uppercase">
                {block.eyebrow}
              </p>
              <p className="mt-2 text-xs tracking-[0.2em] text-[var(--color-ink-500)]">{block.label}</p>

              <p className="font-serif-jp mt-6 text-xl leading-relaxed font-bold text-[var(--color-ink-900)] md:text-3xl md:leading-relaxed">
                {block.statement}
              </p>

              {block.body ? (
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base">
                  {block.body}
                </p>
              ) : (
                <p className="mt-6 text-sm text-[var(--color-ink-500)]">
                  本文
                  <PendingBadge />
                </p>
              )}

              {block.id === "value" && (
                <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
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
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
