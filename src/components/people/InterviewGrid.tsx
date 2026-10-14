"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { InterviewCard } from "@/components/people/InterviewCard";
import { departments } from "@/data/departments";
import { EASE_STANDARD } from "@/lib/motion";
import type { Person } from "@/data/people";

const ALL = "all";

/**
 * 社員インタビューの一覧。
 * 上部の部署フィルターで同一ページ内のまま絞り込む（該当者がいる部署だけを出す）。
 * カードは共通コンポーネントを使い、人数が増えても同じ寸法で並ぶようにしている。
 */
export function InterviewGrid({ people }: { people: Person[] }) {
  // 募集要項から ?dept=xxx で来た場合は、その部署タブを選んだ状態で開く。
  const deptParam = useSearchParams().get("dept");
  const [activeId, setActiveId] = useState(
    deptParam && people.some((p) => p.departmentId === deptParam) ? deptParam : ALL,
  );
  const reduceMotion = useReducedMotion() ?? false;

  // インタビュー対象者がいる部署だけをフィルターに出す。
  const filters = useMemo(() => {
    const ids = new Set(people.map((p) => p.departmentId).filter(Boolean));
    return [
      { id: ALL, name: "ALL" },
      ...departments.filter((d) => ids.has(d.id)).map((d) => ({ id: d.id, name: d.name })),
    ];
  }, [people]);

  const shown = activeId === ALL ? people : people.filter((p) => p.departmentId === activeId);

  return (
    <div>
      {/* 四角めのタブ。選択中は赤地に白、未選択は薄いアイボリー地に黒。 */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {filters.map((filter) => {
          const isActive = filter.id === activeId;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(filter.id)}
              className={`rounded-sm border px-4 py-2.5 text-sm transition-colors md:px-5 ${
                isActive
                  ? "border-[var(--color-accent-600)] bg-[var(--color-accent-600)] font-bold text-[var(--color-paper-050)]"
                  : "border-[var(--color-paper-200)] bg-[var(--color-ivory-050)] text-[var(--color-ink-900)] hover:border-[var(--color-accent-500)]"
              }`}
            >
              {filter.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-x-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((person) => (
            <motion.div
              key={person.slug}
              layout={!reduceMotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_STANDARD }}
            >
              <InterviewCard person={person} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
