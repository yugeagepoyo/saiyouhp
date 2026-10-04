"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { Button } from "@/components/ui/Button";
import type { JobGroup } from "@/data/jobs";
import { EASE_STANDARD } from "@/lib/motion";
import { SectionDecor } from "@/components/ui/SectionDecor";

const groups: { id: JobGroup; label: string }[] = [
  { id: "general", label: "総合職" },
  { id: "office", label: "事務職" },
];

/** WORK：総合職／事務職のタブでビジュアルを切り替えて見せる。詳細は /work へ。 */
export function WorkPickup() {
  const [group, setGroup] = useState<JobGroup>("general");
  const label = groups.find((g) => g.id === group)?.label ?? "";

  return (
    <section className="relative overflow-hidden bg-[var(--color-paper-050)] py-24 md:py-40">
      <SectionDecor variant="work" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Work"
          title="仕事を知る"
          description="それぞれの職種で、どのような仕事に携わり、どのように活躍しているのかをご紹介します。"
        />

        <div role="tablist" className="mt-10 flex gap-2 border-b border-[var(--color-paper-200)]">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={group === g.id}
              onClick={() => setGroup(g.id)}
              className={`relative shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
                group === g.id
                  ? "text-[var(--color-ink-900)]"
                  : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              }`}
            >
              {g.label}
              {group === g.id && (
                <motion.span
                  layoutId="work-pickup-tab"
                  className="absolute inset-x-0 -bottom-px block h-0.5 bg-[var(--color-accent-500)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_STANDARD }}
            >
              <RevealImage
                alt={`${label}の仕事風景`}
                label={`${label}の写真（仮）`}
                aspectClassName="aspect-[16/9]"
                className="rounded-3xl"
                revealOnMount
                parallax
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <Button href="/work" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
