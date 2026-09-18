"use client";

import { useState } from "react";
import Link from "next/link";
import type { Job, JobGroup } from "@/data/jobs";
import { getDepartmentById } from "@/data/departments";

const groups: { id: JobGroup; label: string }[] = [
  { id: "general", label: "総合職" },
  { id: "office", label: "事務職" },
];

/**
 * 「自分に合う仕事を探す」ための職種タブ／インデックスUI。
 * 会社全体の職種関係を俯瞰する WorkDiagram（相関図）とは役割を分け、
 * こちらは総合職／事務職の大分類→部署ごとの求人一覧→詳細ページ（既存の/recruit/[slug]）という導線にする。
 */
export function WorkJobsExplorer({ jobs }: { jobs: Job[] }) {
  const [group, setGroup] = useState<JobGroup>("general");
  const filtered = jobs.filter((job) => job.jobGroup === group);

  // 部署ごとにまとめて表示する（例: 総合職→営業部/建設事業部/解体産廃事業部）
  const byDepartment = new Map<string, Job[]>();
  for (const job of filtered) {
    const list = byDepartment.get(job.departmentId) ?? [];
    list.push(job);
    byDepartment.set(job.departmentId, list);
  }

  return (
    <div>
      <div role="tablist" className="flex gap-2 overflow-x-auto border-b border-[var(--color-paper-200)]">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={group === g.id}
            onClick={() => setGroup(g.id)}
            className={`relative shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              group === g.id
                ? "text-[var(--color-ink-900)]"
                : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
            }`}
          >
            {g.label}
            {group === g.id && <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--color-accent-500)]" />}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 space-y-10">
          {Array.from(byDepartment.entries()).map(([departmentId, deptJobs]) => {
            const dept = getDepartmentById(departmentId);
            return (
              <div key={departmentId}>
                <p className="text-xs font-medium tracking-[0.15em] text-[var(--color-ink-500)] uppercase">
                  {dept?.name ?? departmentId}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {deptJobs.map((job) => (
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
                      <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{job.summary}</p>
                      <p className="mt-auto text-xs font-medium text-[var(--color-ink-500)]">{job.salaryRange}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-12 text-sm text-[var(--color-ink-500)]">
          現在、{groups.find((g) => g.id === group)?.label}の募集はありません。
        </p>
      )}
    </div>
  );
}
