"use client";

import { useState } from "react";
import Link from "next/link";
import type { Job, JobCategory } from "@/data/jobs";

const categories: { id: JobCategory; label: string }[] = [
  { id: "mid-career", label: "中途採用" },
  { id: "new-grad", label: "新卒採用" },
];

export function RecruitTabs({ jobs }: { jobs: Job[] }) {
  const [category, setCategory] = useState<JobCategory>("mid-career");
  const filtered = jobs.filter((job) => job.category === category);

  return (
    <div>
      <div role="tablist" className="flex gap-2 border-b border-[var(--color-paper-200)]">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            onClick={() => setCategory(c.id)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              category === c.id ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
            }`}
          >
            {c.label}
            {category === c.id && (
              <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--color-accent-500)]" />
            )}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((job) => (
            <Link
              key={job.slug}
              href={`/recruit/${job.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-paper-200)] p-6 transition-colors hover:border-[var(--color-accent-500)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--color-paper-100)] px-3 py-1 text-xs text-[var(--color-ink-700)]">
                  {job.employmentType}
                </span>
                {(job.isSample || job.isProvisional) && (
                  <span className="rounded-full bg-[var(--color-accent-500)]/15 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                    {job.isSample ? "サンプル" : "仮"}
                  </span>
                )}
              </div>
              <p className="font-bold text-[var(--color-ink-900)] group-hover:text-[var(--color-accent-600)]">
                {job.title}
              </p>
              <p className="text-xs text-[var(--color-ink-500)]">{job.location}</p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{job.summary}</p>
              <p className="mt-auto text-xs font-medium text-[var(--color-ink-500)]">{job.salaryRange}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-sm text-[var(--color-ink-500)]">
          現在、{categories.find((c) => c.id === category)?.label}は募集していません。
        </p>
      )}
    </div>
  );
}
