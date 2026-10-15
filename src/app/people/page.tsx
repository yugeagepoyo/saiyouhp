import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InterviewGrid } from "@/components/people/InterviewGrid";
import { CeoMessage } from "@/components/people/CeoMessage";
import { people } from "@/data/people";
import { ceo } from "@/data/leaders";

export const metadata: Metadata = {
  title: "人を知る",
  description: "株式会社ノーブデンスの代表メッセージと、働く従業員のインタビューを紹介します。",
};

export default function PeoplePage() {
  // 実データのある社員のみを並べる（レイアウト確認用のサンプルは出さない）。
  const employees = people.filter((p) => !p.isLeadership && !p.isSample);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="人を知る"
        description="入社のきっかけ、現在の仕事、これからの目標。ノーブデンスで働く社員たちのリアルな声を紹介します。"
      />

      <section id="message" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Message" title="代表メッセージ" />
          <div className="mt-14 md:mt-20">
            <CeoMessage ceo={ceo} />
          </div>
        </Container>
      </section>

      <section id="interview" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Interview" title="従業員インタビュー" />
          <div className="mt-10 md:mt-12">
            {/* 募集要項からのタブ指定（?dept=）を読むため Suspense で包む。 */}
            <Suspense fallback={null}>
              <InterviewGrid people={employees} />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
