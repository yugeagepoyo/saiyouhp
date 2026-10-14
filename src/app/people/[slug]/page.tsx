import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { InterviewArticle, type InterviewItem } from "@/components/people/InterviewArticle";
import { people, getPersonBySlug, type Person } from "@/data/people";
import { getDepartmentById } from "@/data/departments";
import { getAffiliation } from "@/components/people/InterviewCard";

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
  { key: "beforeAfterText", question: "入社前 → 入社後の変化" },
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


  const items: InterviewItem[] = qaFields
    .filter((f) => typeof person[f.key] === "string" && person[f.key])
    .map((f) => ({ question: f.question, answer: person[f.key] as string }));

  // Before/After形式で回答いただいている方は、同じ見出しで前後を並べて表示する。
  if (person.beforeAfter) {
    items.unshift({
      question: "入社前 → 入社後の変化",
      answer: `${person.beforeAfter.before}\n\n${person.beforeAfter.after}`,
    });
  }


  return (
    <>
      <InterviewArticle
        profile={{
          name: person.name,
          nameEn: person.nameEn,
          kana: person.kana,
          affiliation: getAffiliation(person),
          joinYear: person.joinYear,
          photoSrc: person.photoSrc,
          photoLabel: "社員写真（仮）",
          isSample: person.isSample,
        }}
        items={items}
      />

      {/* 取材がこれからの方。本文は入稿後にデータへ追記すればそのまま表示される。 */}
      {items.length === 0 && (
        <section className="pb-20 md:pb-28">
          <Container className="max-w-[860px]">
            <p className="text-sm leading-relaxed text-[var(--color-ink-500)]">
              インタビューは準備中です。公開までしばらくお待ちください。
            </p>
          </Container>
        </section>
      )}

      {person.quote && (
        <section className="section-blend blend-paper-100 py-16 text-center md:py-20">
          <Container className="max-w-2xl">
            <p className="font-serif-jp text-xl leading-relaxed font-medium text-[var(--color-ink-900)] md:text-2xl md:leading-relaxed">
              「{person.quote}」
            </p>
          </Container>
        </section>
      )}
    </>
  );
}
