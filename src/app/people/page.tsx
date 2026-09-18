import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PeopleCarousel } from "@/components/people/PeopleCarousel";
import { LeadershipSlide } from "@/components/people/LeadershipSlide";
import { people } from "@/data/people";

export const metadata: Metadata = {
  title: "人を知る",
  description: "株式会社ノーブデンスで働く社員のインタビューと、代表・部長からのメッセージを紹介します。",
};

export default function PeoplePage() {
  const leaders = people.filter((p) => p.isLeadership);
  const employees = people.filter((p) => !p.isLeadership);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="人を知る"
        description="入社のきっかけ、現在の仕事、これからの目標。ノーブデンスで働く社員たちのリアルな声を紹介します。"
      />

      <div id="message" className="scroll-mt-20">
        <Container className="pb-6">
          <SectionHeading eyebrow="Message" title="社長・部長メッセージ" />
        </Container>
        {leaders.map((leader, i) => (
          <LeadershipSlide key={leader.slug} leader={leader} index={i} />
        ))}
      </div>

      <section id="interview" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Interview" title="社員インタビュー" />
        </Container>
        <div className="mt-10">
          <PeopleCarousel people={employees} />
        </div>
      </section>
    </>
  );
}
