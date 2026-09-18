"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { departments, getDepartmentById, type Department } from "@/data/departments";
import { jobs } from "@/data/jobs";
import { people } from "@/data/people";
import { DepartmentIcon } from "@/components/top/DepartmentIcon";
import { fadeUpVariants, staggerContainer, EASE_STANDARD } from "@/lib/motion";

interface WorkDiagramProps {
  /** 部署idごとのアンカーid。指定された部署はパネルを開かず、該当セクションへスムーズスクロールする。 */
  jumpAnchors?: Record<string, string>;
}

interface OriginPoint {
  xPercent: number;
  yPercent: number;
}

export function WorkDiagram({ jumpAnchors }: WorkDiagramProps = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<OriginPoint | null>(null);
  const active = activeId ? getDepartmentById(activeId) : null;

  function handleSelect(departmentId: string, el?: HTMLElement) {
    const anchor = jumpAnchors?.[departmentId];
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (el) {
      const rect = el.getBoundingClientRect();
      setOrigin({
        xPercent: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        yPercent: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
    } else {
      setOrigin(null);
    }
    setActiveId(departmentId);
  }

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.08)}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {departments.map((dept) => (
            <motion.div key={dept.id} variants={fadeUpVariants}>
              <DepartmentCard
                department={dept}
                isDimmed={activeId !== null && activeId !== dept.id}
                onSelect={(el) => handleSelect(dept.id, el)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && <DepartmentPanel department={active} origin={origin} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </>
  );
}

function DepartmentCard({
  department,
  isDimmed,
  onSelect,
}: {
  department: Department;
  isDimmed: boolean;
  onSelect: (el: HTMLElement) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={(e) => onSelect(e.currentTarget)}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="hover"
      className={`group flex h-full w-full flex-col justify-between gap-4 rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] p-5 text-left transition-all duration-300 hover:border-[var(--color-accent-500)] ${
        isDimmed ? "scale-[0.97] opacity-30" : "scale-100 opacity-100"
      }`}
    >
      <DepartmentIcon effect={department.hoverEffect} />
      <div>
        <p className="font-bold text-[var(--color-ink-900)]">{department.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-500)]">{department.shortDescription}</p>
      </div>
      <span className="text-xs font-medium text-[var(--color-accent-600)]">詳しく見る →</span>
    </motion.button>
  );
}

function DepartmentPanel({
  department,
  origin,
  onClose,
}: {
  department: Department;
  origin: OriginPoint | null;
  onClose: () => void;
}) {
  const relatedJobs = jobs.filter((j) => j.published && j.departmentId === department.id);
  const relatedPeople = people.filter((p) => p.departmentId === department.id);
  const transformOrigin = origin ? `${origin.xPercent}% ${origin.yPercent}%` : "50% 50%";

  return (
    <>
      <motion.div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[var(--color-ink-900)]/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_STANDARD }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${department.name}の詳細`}
          style={{ transformOrigin }}
          initial={{ opacity: 0, scale: 0.35 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.45, ease: EASE_STANDARD }}
          className="relative flex h-full w-full flex-col overflow-y-auto bg-[var(--color-paper-050)] p-6 shadow-2xl sm:h-auto sm:max-h-[88vh] sm:w-full sm:max-w-2xl sm:rounded-3xl sm:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-paper-200)] text-[var(--color-ink-700)] hover:border-[var(--color-accent-500)]"
          >
            ×
          </button>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: EASE_STANDARD }}
          >
            <p className="font-display text-xs tracking-[0.2em] text-[var(--color-accent-600)] uppercase">
              Department
            </p>
            <h2 className="font-serif-jp mt-2 text-2xl font-bold text-[var(--color-ink-900)] md:text-3xl">
              {department.name}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div>
                  <p className="mb-2 text-xs font-medium text-[var(--color-ink-500)]">部署の役割</p>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{department.role}</p>
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-[var(--color-ink-500)]">主な仕事内容</p>
                  <ul className="space-y-2">
                    {department.tasks.map((task) => (
                      <li key={task} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink-700)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-[var(--color-ink-500)]">関係する部署</p>
                  <div className="flex flex-wrap gap-2">
                    {department.relatedDepartmentIds.map((id) => {
                      const d = getDepartmentById(id);
                      if (!d) return null;
                      return (
                        <span
                          key={id}
                          className="rounded-full bg-[var(--color-paper-100)] px-3 py-1 text-xs text-[var(--color-ink-700)]"
                        >
                          {d.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <div className="border-t border-[var(--color-paper-200)] pt-6 md:border-t-0 md:pt-0">
                  <p className="mb-3 text-xs font-medium text-[var(--color-ink-500)]">社員紹介</p>
                  {relatedPeople.length > 0 ? (
                    <ul className="space-y-2">
                      {relatedPeople.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/people/${p.slug}`}
                            className="text-sm text-[var(--color-accent-600)] hover:underline"
                          >
                            {p.name}のインタビューを見る →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--color-ink-500)]">準備中です。</p>
                  )}
                </div>

                <div className="mt-6 border-t border-[var(--color-paper-200)] pt-6">
                  <p className="mb-3 text-xs font-medium text-[var(--color-ink-500)]">募集職種</p>
                  {relatedJobs.length > 0 ? (
                    <ul className="space-y-2">
                      {relatedJobs.map((j) => (
                        <li key={j.slug}>
                          <Link
                            href={`/recruit/${j.slug}`}
                            className="text-sm text-[var(--color-accent-600)] hover:underline"
                          >
                            {j.title} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--color-ink-500)]">現在この部署の募集はありません。</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
