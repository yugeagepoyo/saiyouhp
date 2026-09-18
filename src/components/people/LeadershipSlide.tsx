"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RevealImage } from "@/components/ui/RevealImage";
import { EASE_STANDARD } from "@/lib/motion";
import type { Person } from "@/data/people";

export function LeadershipSlide({ leader, index }: { leader: Person; index: number }) {
  const fromLeft = index % 2 === 0;

  return (
    <section className="section-dark flex min-h-[100svh] items-center py-16">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE_STANDARD }}
          className={fromLeft ? "lg:order-1" : "lg:order-2"}
        >
          <RevealImage alt={`${leader.role} ${leader.name}`} label="役員写真（仮）" aspectClassName="aspect-[3/4]" />
        </motion.div>

        <div className={fromLeft ? "lg:order-2" : "lg:order-1"}>
          {leader.isSample && (
            <span className="mb-4 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[var(--color-paper-050)]/80">
              サンプル
            </span>
          )}
          <p className="font-display mb-4 text-xs tracking-[0.25em] text-[var(--color-accent-500)] uppercase">
            {leader.role}
          </p>
          <p className="font-serif-jp text-xl leading-relaxed font-medium text-[var(--color-paper-050)] md:text-2xl md:leading-relaxed">
            {leader.quote}
          </p>
          <p className="mt-6 text-sm font-bold text-[var(--color-paper-050)]">
            {leader.role}　{leader.name}
          </p>
          <Link
            href={`/people/${leader.slug}`}
            className="mt-4 inline-block text-sm text-[var(--color-accent-500)] underline underline-offset-4"
          >
            インタビュー全文を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
