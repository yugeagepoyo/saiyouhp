"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";
import type { Job, JobVariant } from "@/data/jobs";

/**
 * 募集要項パネル。
 *
 * ・白〜アイボリーの大きな角丸の面に、項目名（左）／内容（右）の2カラムで積む
 * ・区切りは薄い点線のみ。テーブル然とした罫線は使わない
 * ・営業職は「未経験者／経験者」をインデックスタブで切り替える
 *   （切り替わるのは給与と応募条件だけ。他の条件は区分共通）
 */

const LABEL_WIDTH = "md:grid-cols-[11rem_1fr]";

/** 「想定年収：5,000,000円〜」のような行は、金額だけを大きく赤で見せる */
const HIGHLIGHT_PATTERN = /^(想定年収|月給)[:：](.+)$/;

function Row({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-1.5 py-5 ${LABEL_WIDTH} md:gap-8 md:py-6 ${
        last ? "" : "border-b border-dashed border-[var(--color-paper-200)]"
      }`}
    >
      <p className="flex items-start gap-2.5 text-sm font-bold text-[var(--color-ink-900)]">
        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-600)]" />
        {label}
      </p>
      <div className="pl-5 md:pl-0">{children}</div>
    </div>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((item) => {
        const match = HIGHLIGHT_PATTERN.exec(item);
        if (match) {
          return (
            <p key={item} className="text-sm text-[var(--color-ink-900)]">
              <span className="text-[var(--color-ink-700)]">{match[1]}</span>
              <span className="font-display ml-2 text-xl font-semibold text-[var(--color-accent-600)] sm:text-2xl md:text-3xl">
                {match[2]}
              </span>
            </p>
          );
        }
        return (
          <p key={item} className="text-sm leading-relaxed text-[var(--color-ink-900)]">
            {item}
          </p>
        );
      })}
    </div>
  );
}

function SalaryRows({ variant, commonNotes }: { variant: JobVariant; commonNotes?: string[] }) {
  const extraNotes = [...variant.salaryNotes, ...(commonNotes ?? [])];
  return (
    <>
      {variant.salary.map((item, i) => {
        const isLast = i === variant.salary.length - 1;
        return (
          <Row key={item.label} label={item.label}>
            {item.note && <p className="text-sm text-[var(--color-ink-700)]">{item.note}</p>}
            <p className="font-display text-xl leading-tight font-semibold text-[var(--color-accent-600)] sm:text-2xl md:text-3xl">
              {item.value}
            </p>
            {(item.notes ?? []).map((note) => (
              <p key={note} className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-700)]">
                {note}
              </p>
            ))}
            {isLast &&
              extraNotes.map((note) => (
                <p key={note} className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-700)]">
                  {note}
                </p>
              ))}
          </Row>
        );
      })}
    </>
  );
}

export function JobRequirementsSections({ job }: { job: Job }) {
  const variants = job.variants ?? [];
  const hasVariants = variants.length > 0;
  const [activeId, setActiveId] = useState(variants[0]?.id ?? "");
  const active = variants.find((v) => v.id === activeId) ?? variants[0];
  const reduceMotion = useReducedMotion() ?? false;
  const req = job.requirements;

  return (
    <>
      <div id="requirements" className="scroll-mt-24">
      {/* 書類のインデックスのように、パネルの上辺へタブを差し込む */}
      {hasVariants && (
        <div role="tablist" aria-label="経験区分" className="flex items-end gap-1.5">
          {variants.map((v) => {
            const isActive = v.id === active?.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(v.id)}
                // 選択中は赤地＋白文字。ページ地色も赤のため、細い白枠と高さで区別し、
                // 下向きの三角で内容エリアとつながって見えるようにする。
                className={`relative min-w-[8.5rem] rounded-t-md border border-b-0 px-6 text-sm font-bold transition-colors sm:min-w-[11rem] sm:text-base ${
                  isActive
                    ? "z-10 border-[var(--color-paper-050)]/85 bg-[var(--color-accent-600)] py-4 text-[var(--color-paper-050)] sm:py-4.5"
                    : "border-[var(--color-paper-200)] bg-[var(--color-ivory-100)] py-3 text-[var(--color-ink-700)] hover:bg-[var(--color-ivory-050)]"
                }`}
              >
                {v.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -bottom-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-[var(--color-accent-600)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div
        className={`bg-[var(--color-paper-050)] px-6 py-10 md:px-12 md:py-14 ${
          hasVariants ? "rounded-3xl rounded-tl-none" : "rounded-3xl"
        }`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
          <h2 className="font-serif-jp text-2xl font-bold text-[var(--color-accent-600)] md:text-3xl">
            {job.title}
            {active && (
              <span className="ml-1 text-xl text-[var(--color-ink-900)] md:text-2xl">（{active.label}）</span>
            )}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-700)]">{job.summary}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id ?? "single"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_STANDARD }}
            className="mt-10 border-t border-dashed border-[var(--color-paper-200)]"
          >
            {req && <Row label="募集職種">{<Lines items={[req.jobDescription]} />}</Row>}

            {active && <SalaryRows variant={active} commonNotes={job.salaryCommonNotes} />}

            {(job.conditions ?? []).map((group) => (
              <Row key={group.label} label={group.label}>
                <Lines items={group.items} />
              </Row>
            ))}

            {req && (
              <>
                <Row label="雇用形態">
                  <Lines items={[req.employmentType]} />
                </Row>
                <Row label="勤務地">
                  <Lines items={[req.workLocation]} />
                </Row>
                {req.applicationRequirements && (
                  <Row label="応募条件">
                    <Lines items={[req.applicationRequirements]} />
                  </Row>
                )}
              </>
            )}

            {active && (
              <>
                <Row label="必要な経験">
                  <Lines items={[active.requiredExperience]} />
                </Row>
                <Row label="必要資格">
                  <Lines items={[active.requiredQualifications]} />
                </Row>
                <Row label="学歴条件">
                  <Lines items={[active.educationRequirement]} />
                </Row>
              </>
            )}

            {!hasVariants && job.requiredExperience && (
              <>
                <Row label="必要な経験">
                  <Lines items={[job.requiredExperience]} />
                </Row>
                <Row label="必要資格">
                  <Lines items={[job.requiredQualifications ?? ""]} />
                </Row>
                <Row label="学歴条件">
                  <Lines items={[job.educationRequirement ?? ""]} />
                </Row>
              </>
            )}

            {req && (
              <Row label="受動喫煙対策" last>
                <Lines items={[req.smokingMeasures]} />
              </Row>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-xs leading-relaxed text-[var(--color-ink-500)]">
          その他の社内制度・福利厚生は
          <Link href="/about#benefits" className="text-[var(--color-accent-600)] underline underline-offset-4">
            福利厚生
          </Link>
          をご覧ください。
        </p>
        </div>
      </div>

      <IdealCandidate job={job} active={active} />
    </>
  );
}

/** 求める人物像。中央揃えで、理念への共感 → 行動特性 → 思考性 の順に見せる。 */
function IdealCandidate({ job, active }: { job: Job; active?: JobVariant }) {
  const lead = active?.idealCandidateLead ?? job.idealCandidateLead;
  // 行動特性／思考性が登録されている職種はその2本立てで見せる。
  // 登録がない職種（営業職）は、見出しなしの人物像リスト＋「活躍している人の特徴」で見せる。
  const behavior = active ? undefined : job.behaviorTraits;
  const mindset = active ? undefined : job.mindsetTraits;
  const columns = [
    { label: "行動特性", items: behavior },
    { label: "思考性", items: mindset },
  ].filter((c) => c.items && c.items.length > 0);
  const plainTraits = columns.length === 0 ? (active ? active.idealCandidate : job.idealCandidate) : undefined;
  const successTraits = columns.length === 0 ? (active ? active.successTraits : job.successTraits) : undefined;

  if (!lead && columns.length === 0 && !plainTraits?.length && !successTraits?.length) return null;

  return (
    <div id="candidate" className="scroll-mt-24 rounded-3xl bg-[var(--color-paper-050)] px-6 py-12 md:px-12 md:py-16">
      <h2 className="font-serif-jp text-center text-2xl font-bold text-[var(--color-ink-900)] md:text-3xl">
        求める人物像
      </h2>

      {lead && (
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-loose text-[var(--color-ink-900)] md:text-base">
          {lead}
        </p>
      )}

      {plainTraits && plainTraits.length > 0 && (
        <ul className="mx-auto mt-8 max-w-xl space-y-2.5">
          {plainTraits.map((t) => (
            <li
              key={t}
              className="flex justify-center gap-2.5 text-sm leading-relaxed text-[var(--color-ink-900)]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-600)]" />
              {t}
            </li>
          ))}
        </ul>
      )}

      {successTraits && successTraits.length > 0 && (
        <div className="mx-auto mt-10 max-w-xl">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--color-paper-200)]" />
            <p className="text-sm font-bold tracking-[0.08em] text-[var(--color-accent-600)]">
              活躍している人の特徴
            </p>
            <span className="h-px flex-1 bg-[var(--color-paper-200)]" />
          </div>
          <ul className="mt-6 space-y-2.5">
            {successTraits.map((t) => (
              <li
                key={t}
                className="flex justify-center gap-2.5 text-sm leading-relaxed text-[var(--color-ink-900)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-600)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {columns.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {columns.map((col) => (
            <div key={col.label}>
              {/* 見出しが中央に浮いて見えるよう、左右へ細い罫線を伸ばす */}
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-[var(--color-paper-200)]" />
                <p className="text-sm font-bold tracking-[0.08em] text-[var(--color-accent-600)]">
                  {col.label}
                </p>
                <span className="h-px flex-1 bg-[var(--color-paper-200)]" />
              </div>
              <ul className="mt-6 space-y-2.5">
                {col.items!.map((t) => (
                  <li
                    key={t}
                    className="flex justify-center gap-2.5 text-sm leading-relaxed text-[var(--color-ink-900)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-600)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
