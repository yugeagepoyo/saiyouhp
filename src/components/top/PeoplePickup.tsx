import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { Button } from "@/components/ui/Button";
import { people } from "@/data/people";
import { getDepartmentById } from "@/data/departments";
import { SectionDecor } from "@/components/ui/SectionDecor";

const PICKUP_COUNT = 3;

/** PEOPLE：社員紹介。/people と同じ @/data/people を参照し、TOP側で文言を持たない。 */
export function PeoplePickup() {
  // 社長・部長のメッセージではなく、社員インタビューを抜粋する。
  const pickups = people.filter((person) => !person.isLeadership).slice(0, PICKUP_COUNT);

  return (
    <section className="relative overflow-hidden bg-[var(--color-paper-000)] py-24 md:py-40">
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
            <Link key={person.slug} href={`/people/${person.slug}`} className="group block">
              <RevealImage
                alt={`${person.role}で働く${person.name}`}
                label="社員写真（仮）"
                className="rounded-2xl"
                parallax
              />
              <div className="mt-4 flex items-center gap-2">
                <p className="text-sm font-bold text-[var(--color-ink-900)] group-hover:text-[var(--color-accent-600)]">
                  {person.name}
                </p>
                {person.isSample && (
                  <span className="rounded-full bg-[var(--color-accent-500)]/15 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                    サンプル
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--color-ink-500)]">
                {getDepartmentById(person.departmentId)?.name ?? person.role} / {person.joinYear}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{person.quote}</p>
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
