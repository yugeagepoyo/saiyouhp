import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { jobs, getJobBySlug } from "@/data/jobs";
import { getDepartmentById } from "@/data/departments";
import { JobRequirementsSections } from "@/components/recruit/JobRequirementsPanel";
import { getPersonBySlug } from "@/data/people";
import { ENTRY_HREF } from "@/data/nav";

export function generateStaticParams() {
  // 非公開（勤務条件が未登録）の職種は事前生成しない。
  // 直接URLを開かれた場合は「現在募集はありません」を表示する。
  return jobs.filter((job) => job.published).map((job) => ({ slug: job.slug }));
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

/** パネル内の中央揃え見出し */
function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif-jp text-center text-2xl font-bold text-[var(--color-ink-900)] md:text-3xl">
      {children}
    </h2>
  );
}

/** 募集一覧へ戻る導線（赤地の上に置く、矢印＋テキストのリンク表現） */
function BackToList() {
  return (
    <Link
      href="/recruit"
      className="group inline-flex items-center gap-3 border-b border-[var(--color-paper-050)]/40 pb-2 text-sm text-[var(--color-paper-050)] transition-colors hover:border-[var(--color-paper-050)]"
    >
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
      募集一覧へ戻る
    </Link>
  );
}

function Panel({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-3xl bg-[var(--color-paper-050)] px-6 py-12 md:px-12 md:py-16"
    >
      {children}
    </div>
  );
}

export default async function JobDetailPage(props: PageProps<"/recruit/[slug]">) {
  const { slug } = await props.params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const dept = getDepartmentById(job.departmentId);

  // 勤務条件が未登録の職種は、条件を推測して出さず募集なしとして扱う。
  if (!job.published) {
    return (
      <section className="py-24 text-center md:py-32">
        <Container className="max-w-lg">
          <p className="font-heading-en text-xs tracking-[0.3em] text-[var(--color-ink-500)] uppercase">
            Recruit
          </p>
          <h1 className="font-serif-jp mt-4 text-2xl font-bold text-[var(--color-ink-900)]">
            {job.title}
          </h1>
          <p className="mt-6 text-sm text-[var(--color-ink-700)]">現在募集はありません。</p>
          <div className="mt-10">
            <Button href="/recruit" variant="secondary">
              募集職種一覧へ
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    // ページ全体の地色はくすんだコーラル。情報は白〜アイボリーの面にまとめる。
    <div className="bg-[var(--color-accent-muted)] py-16 md:py-24">
      <Container className="max-w-4xl">
        {/* 上部の戻り導線。詳細タイトルのすぐ近くに置く。 */}
        <BackToList />

        <div className="mt-10 flex flex-wrap items-center gap-2 text-xs text-[var(--color-paper-050)] md:mt-14">
          <span className="rounded-full bg-[var(--color-paper-050)]/20 px-3 py-1">
            {job.category === "mid-career" ? "中途採用" : "新卒採用"}
          </span>
          <span className="rounded-full bg-[var(--color-paper-050)]/20 px-3 py-1">{job.employmentType}</span>
          {dept && <span className="rounded-full bg-[var(--color-paper-050)]/20 px-3 py-1">{dept.name}</span>}
        </div>

        {/* 他ページと同じく、大きな英字タイトル → 日本語タイトルの順に左寄せで積む。 */}
        <p className="font-heading-en mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.92] font-semibold tracking-[-0.02em] text-[var(--color-paper-050)] uppercase md:mt-8">
          Recruit
        </p>
        <h1 className="font-serif-jp mt-6 text-2xl font-bold text-[var(--color-paper-050)] md:mt-8 md:text-4xl">
          募集要項
        </h1>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          <JobRequirementsSections job={job} />

          {job.workDetails && (
            <Panel id="work-details">
              <PanelHeading>仕事内容</PanelHeading>
              <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-loose text-[var(--color-ink-900)] md:text-base">
                {job.workDetails}
              </p>
            </Panel>
          )}

          {job.dailySchedule && (
            <Panel id="schedule">
              <PanelHeading>1日のスケジュール</PanelHeading>
              <ol className="mx-auto mt-10 max-w-md space-y-4 border-l border-dashed border-[var(--color-paper-200)] pl-6">
                {job.dailySchedule.map((item) => (
                  <li key={item.time} className="relative">
                    <span className="absolute top-1.5 -left-[28px] h-2 w-2 rounded-full bg-[var(--color-accent-600)]" />
                    <span className="font-display text-sm text-[var(--color-ink-900)]">{item.time}</span>
                    <span className="ml-3 text-sm text-[var(--color-ink-700)]">{item.activity}</span>
                  </li>
                ))}
              </ol>
            </Panel>
          )}

          {job.relatedPeopleSlugs && job.relatedPeopleSlugs.length > 0 && (
            <Panel>
              <PanelHeading>関連する社員インタビュー</PanelHeading>
              <ul className="mt-8 space-y-2 text-center">
                {job.relatedPeopleSlugs.map((s) => {
                  const person = getPersonBySlug(s);
                  if (!person) return null;
                  return (
                    <li key={s}>
                      <Link
                        href={`/people/${s}`}
                        className="text-sm text-[var(--color-accent-600)] hover:underline"
                      >
                        {person.name}のインタビューを見る →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          )}

          <Panel>
            <p className="text-center text-sm text-[var(--color-ink-700)]">
              この職種が気になった方は、お気軽にエントリーください。
            </p>
            <div className="mt-6 text-center">
              <Button href={`${ENTRY_HREF}?job=${job.slug}`} variant="primary">
                この職種に応募する
              </Button>
            </div>
          </Panel>
        </div>

        {/* 最下部の戻り導線。応募ボタンの下に置く。 */}
        <div className="mt-12 md:mt-16">
          <BackToList />
        </div>
      </Container>
    </div>
  );
}
