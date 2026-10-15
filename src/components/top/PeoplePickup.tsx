import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InterviewCarousel } from "@/components/people/InterviewCarousel";
import { people } from "@/data/people";
import { SectionDecor } from "@/components/ui/SectionDecor";

/**
 * PEOPLE：社員インタビューへの入口。
 * 「人を知る」ページと同じ @/data/people を参照しているため、
 * 人物を追加すればTOPのカルーセルにもそのまま並ぶ。
 * TOPは流れる人物紹介、「人を知る」ページは部署別の一覧、と役割を分けている。
 */
export function PeoplePickup() {
  // 実データのある社員のみを並べる（レイアウト確認用のサンプルは出さない）。
  const employees = people.filter((person) => !person.isLeadership && !person.isSample);

  return (
    <section className="section-blend blend-paper-000 relative overflow-hidden py-24 md:py-40">
      <SectionDecor variant="people" />
      <div className="relative">
        <Container>
          <SectionHeading
            eyebrow="People"
            title="人を知る"
            description="入社のきっかけ、現在の仕事、これからの目標。ノーブデンスで働く社員たちのリアルな声を紹介します。"
          />
        </Container>

        {/* カルーセルは画面端まで流すため Container の外に出し、開始位置だけ本文の左端に揃える。 */}
        <div className="mt-12 pl-6 md:pl-10">
          <InterviewCarousel people={employees} />
        </div>

        <Container>
          <div className="mt-10 text-center">
            <Button href="/people" variant="secondary">
              View more
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
