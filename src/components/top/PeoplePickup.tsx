import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { Button } from "@/components/ui/Button";
import { ceo, departmentLeaders } from "@/data/leaders";
import { SectionDecor } from "@/components/ui/SectionDecor";

const PICKUP_COUNT = 3;

/**
 * PEOPLE：人物紹介。
 * 「人を知る」ページと同じ @/data/leaders を参照しているため、
 * 写真・氏名・役職・リンクを更新すればTOPにもそのまま反映される。
 */
export function PeoplePickup() {
  const allLeaders = [ceo, ...departmentLeaders];
  // 写真が届いている方を優先して並べ、TOPには3名まで出す。
  const pickups = [
    ...allLeaders.filter((person) => person.photoSrc),
    ...allLeaders.filter((person) => !person.photoSrc),
  ].slice(0, PICKUP_COUNT);

  return (
    <section className="section-blend blend-paper-000 relative overflow-hidden py-24 md:py-40">
      <SectionDecor variant="people" />
      <Container className="relative">
        <SectionHeading
          eyebrow="People"
          title="人を知る"
          description="入社のきっかけ、現在の仕事、これからの目標。ノーブデンスで働く社員たちのリアルな声を紹介します。"
        />

        {/* 画像の左右端を WORK セクションの1枚画像（max-w-4xl）と揃える */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {pickups.map((person) => (
            <Link
              key={person.id}
              // インタビュー詳細がある方はその記事へ、ない方は「人を知る」ページへ。
              href={person.personSlug ? `/people/${person.personSlug}` : "/people#message"}
              className="group block"
            >
              <RevealImage
                alt={`${person.role} ${person.name}`}
                label={person.photoLabel}
                src={person.photoSrc}
                aspectClassName="aspect-[3/4]"
                className="photo-mono"
                parallax
              />
              <p className="mt-4 text-[11px] tracking-[0.16em] text-[var(--color-accent-600)]">
                {person.role}
              </p>
              {/* 氏名の右横に英字表記を並べる */}
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-serif-jp text-lg font-bold text-[var(--color-ink-900)] group-hover:text-[var(--color-accent-600)]">
                  {person.name}
                </p>
                <p className="font-heading-en text-[10px] tracking-[0.22em] text-[var(--color-ink-500)] uppercase">
                  {person.nameEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/people" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
