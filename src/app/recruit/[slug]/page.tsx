import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { jobs, getJobBySlug } from "@/data/jobs";
import { getDepartmentById } from "@/data/departments";
import { getPersonBySlug } from "@/data/people";
import { ENTRY_HREF } from "@/data/nav";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata(props: PageProps<"/recruit/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  return {
    title: job.title,
    description: job.summary,
  };
}

const tocItems = [
  { id: "work-details", label: "仕事内容" },
  { id: "schedule", label: "1日のスケジュール" },
  { id: "income", label: "想定年収・年収モデル" },
  { id: "career", label: "キャリアステップ" },
  { id: "candidate", label: "求める人物像" },
  { id: "requirements", label: "募集要項" },
  { id: "selection", label: "選考フロー" },
];

export default async function JobDetailPage(props: PageProps<"/recruit/[slug]">) {
  const { slug } = await props.params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const dept = getDepartmentById(job.departmentId);
  const req = job.requirements;

  return (
    <>
      <section className="border-b border-[var(--color-paper-200)] bg-[var(--color-paper-100)] py-14 md:py-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-500)]">
            <span className="rounded-full bg-[var(--color-paper-050)] px-3 py-1">
              {job.category === "mid-career" ? "中途採用" : "新卒採用"}
            </span>
            <span className="rounded-full bg-[var(--color-paper-050)] px-3 py-1">{job.employmentType}</span>
            {dept && <span className="rounded-full bg-[var(--color-paper-050)] px-3 py-1">{dept.name}</span>}
            {(job.isSample || job.isProvisional) && (
              <span className="rounded-full bg-[var(--color-accent-500)]/15 px-2 py-1 text-[var(--color-accent-600)]">
                {job.isSample ? "サンプル" : "仮"}
              </span>
            )}
          </div>
          <h1 className="font-serif-jp mt-4 text-3xl leading-tight font-bold text-[var(--color-ink-900)] md:text-4xl">
            {job.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-700)]">{job.summary}</p>
          <div className="mt-6">
            <Button href={`${ENTRY_HREF}?job=${job.slug}`} variant="primary">
              この職種に応募する
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* PC: 左側固定目次 */}
          <nav aria-label="目次" className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--color-ink-700)] hover:bg-[var(--color-paper-100)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* モバイル: 開閉式目次 */}
          <details className="mb-2 rounded-xl border border-[var(--color-paper-200)] lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-[var(--color-ink-900)]">
              目次を開く
            </summary>
            <div className="space-y-1 px-4 pb-4">
              {tocItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block py-2 text-sm text-[var(--color-ink-700)]">
                  {item.label}
                </a>
              ))}
            </div>
          </details>

          <div className="space-y-16">
            <div id="work-details" className="scroll-mt-24">
              <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">仕事内容</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-700)]">{job.workDetails}</p>
              {job.successTraits && job.successTraits.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-[var(--color-ink-500)]">活躍している人の特徴</p>
                  <ul className="space-y-2">
                    {job.successTraits.map((t) => (
                      <li key={t} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink-700)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {job.dailySchedule && (
              <div id="schedule" className="scroll-mt-24">
                <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">1日のスケジュール</h2>
                <ol className="mt-6 space-y-4 border-l-2 border-[var(--color-paper-200)] pl-6">
                  {job.dailySchedule.map((item) => (
                    <li key={item.time} className="relative">
                      <span className="absolute top-1 -left-[29px] h-2 w-2 rounded-full bg-[var(--color-accent-500)]" />
                      <span className="font-display text-sm text-[var(--color-ink-900)]">{item.time}</span>
                      <span className="ml-3 text-sm text-[var(--color-ink-700)]">{item.activity}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div id="income" className="scroll-mt-24">
              <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">想定年収・年収モデル</h2>
              {job.firstYearIncome && (
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-700)]">{job.firstYearIncome}</p>
              )}
              {job.incomeModel && job.incomeModel.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {job.incomeModel.map((step) => (
                    <div key={step.years} className="rounded-xl border border-[var(--color-paper-200)] p-4 text-center">
                      <p className="text-xs text-[var(--color-ink-500)]">{step.years}</p>
                      <p className="font-display mt-2 text-lg text-[var(--color-ink-900)]">{step.income}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {job.careerSteps && (
              <div id="career" className="scroll-mt-24">
                <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">キャリアステップ</h2>
                <ol className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {job.careerSteps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="rounded-full border border-[var(--color-paper-200)] px-4 py-2 text-sm text-[var(--color-ink-700)]">
                        {step}
                      </span>
                      {i < job.careerSteps!.length - 1 && (
                        <span className="hidden text-[var(--color-ink-300)] sm:inline">→</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div id="candidate" className="scroll-mt-24">
              <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">求める人物像</h2>
              {job.idealCandidate && (
                <ul className="mt-4 space-y-2">
                  {job.idealCandidate.map((c) => (
                    <li key={c} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink-700)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-[var(--color-ink-500)]">必要な経験</dt>
                  <dd className="mt-1 text-sm text-[var(--color-ink-900)]">{job.requiredExperience}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-500)]">必要資格</dt>
                  <dd className="mt-1 text-sm text-[var(--color-ink-900)]">{job.requiredQualifications}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-500)]">学歴条件</dt>
                  <dd className="mt-1 text-sm text-[var(--color-ink-900)]">{job.educationRequirement}</dd>
                </div>
              </dl>
            </div>

            {req && (
              <div id="requirements" className="scroll-mt-24">
                <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">募集要項</h2>
                <dl className="mt-6 divide-y divide-[var(--color-paper-200)] border-y border-[var(--color-paper-200)]">
                  {[
                    ["雇用形態", req.employmentType],
                    ["試用期間", req.trialPeriod],
                    ["給与", req.salary],
                    ["勤務地", req.workLocation],
                    ["勤務時間", req.workHours],
                    ["休日・休暇", req.holidays],
                    ["福利厚生", req.benefits],
                    ["社会保険", req.socialInsurance],
                    ["受動喫煙対策", req.smokingMeasures],
                    ["仕事内容", req.jobDescription],
                    ["応募条件", req.applicationRequirements],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-3 gap-4 py-4 text-sm">
                      <dt className="text-[var(--color-ink-500)]">{label}</dt>
                      <dd className="col-span-2 text-[var(--color-ink-900)]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {req && (
              <div id="selection" className="scroll-mt-24">
                <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">選考フロー</h2>
                <ol className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {req.selectionFlow.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="rounded-full bg-[var(--color-paper-100)] px-4 py-2 text-sm text-[var(--color-ink-700)]">
                        {i + 1}. {step}
                      </span>
                      {i < req.selectionFlow.length - 1 && (
                        <span className="hidden text-[var(--color-ink-300)] sm:inline">→</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {job.relatedPeopleSlugs && job.relatedPeopleSlugs.length > 0 && (
              <div>
                <h2 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)]">関連する社員インタビュー</h2>
                <ul className="mt-4 space-y-2">
                  {job.relatedPeopleSlugs.map((s) => {
                    const person = getPersonBySlug(s);
                    if (!person) return null;
                    return (
                      <li key={s}>
                        <Link href={`/people/${s}`} className="text-sm text-[var(--color-accent-600)] hover:underline">
                          {person.name}のインタビューを見る →
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="rounded-2xl bg-[var(--color-paper-100)] p-8 text-center">
              <p className="mb-4 text-sm text-[var(--color-ink-700)]">この職種が気になった方は、お気軽にエントリーください。</p>
              <Button href={`${ENTRY_HREF}?job=${job.slug}`} variant="primary">
                この職種に応募する
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
