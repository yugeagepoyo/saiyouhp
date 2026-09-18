import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { RevealImage } from "@/components/ui/RevealImage";
import { Button } from "@/components/ui/Button";
import { people, getPersonBySlug, type Person } from "@/data/people";
import { getDepartmentById } from "@/data/departments";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/people/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  const dept = getDepartmentById(person.departmentId);
  return {
    title: `${person.name}（${dept?.name ?? ""}）`,
    description: person.currentWork ?? person.quote,
  };
}

// 基本質問。全員がすべてに回答するわけではないため、値が入っている項目だけを表示する。
const qaFields: { key: keyof Person; question: string }[] = [
  { key: "previousCareer", question: "入社前は何をしていましたか？" },
  { key: "howFoundCompany", question: "ノーブデンスを知ったきっかけは？" },
  { key: "reasonForJoining", question: "入社を決めた理由は？" },
  { key: "concernBeforeJoining", question: "入社前に不安だったことは？" },
  { key: "impressionChange", question: "実際に入社して印象が変わったことは？" },
  { key: "currentWork", question: "現在の仕事内容は？" },
  { key: "rewardingMoment", question: "仕事でやりがいを感じる瞬間は？" },
  { key: "growthMoment", question: "一番成長したと感じることは？" },
  { key: "teamAtmosphere", question: "会社や部署の雰囲気は？" },
  { key: "futureChallenge", question: "今後挑戦したいことは？" },
  { key: "idealColleague", question: "どんな人と一緒に働きたいですか？" },
  { key: "messageToApplicants", question: "応募を検討している方へ一言" },
];

export default async function PersonDetailPage(props: PageProps<"/people/[slug]">) {
  const { slug } = await props.params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const dept = getDepartmentById(person.departmentId);
  const answeredFields = qaFields.filter((f) => typeof person[f.key] === "string" && person[f.key]);

  return (
    <>
      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div>
            <RevealImage alt={person.name} label="社員写真（仮）" aspectClassName="aspect-[3/4]" />
            <div className="mt-6">
              {person.isSample && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-accent-500)]/15 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                  サンプル
                </span>
              )}
              <p className="text-xl font-bold text-[var(--color-ink-900)]">{person.name}</p>
              <p className="text-sm text-[var(--color-ink-500)]">
                {person.role}（{dept?.name}） / {person.joinYear}
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {person.beforeAfter && (
              <div>
                <p className="font-display mb-3 text-xs tracking-[0.2em] text-[var(--color-accent-600)] uppercase">
                  入社前 → 入社後の変化
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="rounded-2xl border border-[var(--color-paper-200)] p-5">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-ink-500)] uppercase">Before</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-700)]">
                      {person.beforeAfter.before}
                    </p>
                  </div>
                  <span className="hidden text-[var(--color-accent-600)] sm:inline" aria-hidden>
                    →
                  </span>
                  <div className="rounded-2xl bg-[var(--color-ink-900)] p-5">
                    <p className="text-xs font-bold tracking-wide text-[var(--color-accent-500)] uppercase">After</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-paper-050)]">
                      {person.beforeAfter.after}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {answeredFields.map((f) => (
              <div key={f.key}>
                <p className="font-display mb-2 text-xs tracking-[0.2em] text-[var(--color-accent-600)] uppercase">
                  {f.question}
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{person[f.key] as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-paper-100)] py-16 text-center md:py-20">
        <Container className="max-w-2xl">
          <p className="font-serif-jp text-xl leading-relaxed font-medium text-[var(--color-ink-900)] md:text-2xl md:leading-relaxed">
            「{person.quote}」
          </p>
        </Container>
      </section>

      {person.dailySchedule && person.dailySchedule.length > 0 && (
        <section className="py-16 md:py-24">
          <Container className="max-w-2xl">
            <p className="font-display mb-6 text-xs tracking-[0.2em] text-[var(--color-accent-600)] uppercase">
              1日のスケジュール
            </p>
            <ol className="space-y-4 border-l-2 border-[var(--color-paper-200)] pl-6">
              {person.dailySchedule.map((item) => (
                <li key={item.time} className="relative">
                  <span className="absolute top-1 -left-[29px] h-2 w-2 rounded-full bg-[var(--color-accent-500)]" />
                  <span className="font-display text-sm text-[var(--color-ink-900)]">{item.time}</span>
                  <span className="ml-3 text-sm text-[var(--color-ink-700)]">{item.activity}</span>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <section className="py-16 text-center md:py-24">
        <Container>
          <p className="mb-6 text-sm text-[var(--color-ink-700)]">{dept?.name}の募集職種を見る</p>
          <Button href="/recruit" variant="secondary">
            募集職種一覧を見る
          </Button>
        </Container>
      </section>
    </>
  );
}
