"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";
import { getDepartmentById } from "@/data/departments";
import type { Job, JobCategory } from "@/data/jobs";

const categories: { id: JobCategory; label: string }[] = [
  { id: "mid-career", label: "中途採用" },
  { id: "new-grad", label: "新卒採用" },
];

/**
 * 募集職種一覧。
 * 赤地の上に、角を落としたアイボリーのカードを並べる。
 * 区分は書類のインデックスのような角タブで切り替える（選択中＝アイボリー地＋赤文字）。
 */
export function RecruitTabs({ jobs }: { jobs: Job[] }) {
  const [category, setCategory] = useState<JobCategory>("mid-career");
  const reduceMotion = useReducedMotion() ?? false;
  const filtered = jobs.filter((job) => job.category === category);

  return (
    <div>
      <div role="tablist" aria-label="募集区分" className="flex gap-1.5">
        {categories.map((c) => {
          const isActive = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(c.id)}
              className={`min-w-[8.5rem] px-6 py-4 text-sm font-bold transition-colors sm:min-w-[11.5rem] sm:text-base ${
                isActive
                  ? "bg-[var(--color-ivory-050)] text-[var(--color-accent-600)]"
                  : "border border-[var(--color-paper-050)]/45 text-[var(--color-paper-050)] hover:bg-[var(--color-paper-050)]/10"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_STANDARD }}
        >
          {filtered.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filtered.map((job) => {
                const dept = getDepartmentById(job.departmentId);
                return (
                  <Link
                    key={job.slug}
                    href={`/recruit/${job.slug}`}
                    className="group flex flex-col bg-[var(--color-ivory-050)] px-8 py-10 transition-colors hover:bg-[var(--color-paper-000)] md:px-10 md:py-12"
                  >
                    {dept && (
                      <p className="font-heading-en text-xs tracking-[0.25em] text-[var(--color-accent-600)] uppercase">
                        {dept.nameEn}
                      </p>
                    )}
                    <p className="font-serif-jp mt-6 text-2xl font-bold text-[var(--color-ink-900)] md:text-3xl">
                      {job.title}
                    </p>
                    <p className="jp-pretty mt-5 text-sm leading-relaxed text-[var(--color-ink-700)]">
                      {job.summary}
                    </p>
                    <div className="mt-10 flex items-end justify-between gap-4">
                      <span className="text-sm text-[var(--color-ink-700)]">募集要項を見る</span>
                      <span
                        aria-hidden
                        className="text-xl text-[var(--color-accent-600)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-12 text-sm text-[var(--color-paper-050)]">現在募集はありません。</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
