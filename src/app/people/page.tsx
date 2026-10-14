import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InterviewGrid } from "@/components/people/InterviewGrid";
import { CeoMessage } from "@/components/people/CeoMessage";
import { LeadersMarquee } from "@/components/people/LeadersMarquee";
import { people } from "@/data/people";
import { ceo, departmentLeaders } from "@/data/leaders";

export const metadata: Metadata = {
  title: "人を知る",
  description: "株式会社ノーブデンスで働く社員のインタビューと、代表・部長からのメッセージを紹介します。",
};

export default function PeoplePage() {
  const employees = people.filter((p) => !p.isLeadership);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="人を知る"
        description="入社のきっかけ、現在の仕事、これからの目標。ノーブデンスで働く社員たちのリアルな声を紹介します。"
      />

      <section id="message" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Message" title="代表・部門長メッセージ" />
          <div className="mt-14 md:mt-20">
            <CeoMessage ceo={ceo} />
          </div>
        </Container>

        <div className="mt-24 md:mt-36">
          <Container>
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-[var(--color-accent-600)]" />
              <h3 className="font-heading-en text-sm tracking-[0.2em] text-[var(--color-ink-900)] uppercase md:text-base">
                Department Leaders
              </h3>
            </div>
          </Container>
          {/* カルーセルは画面端まで流すため Container の外に出し、
              開始位置だけ本文の左端に揃える。 */}
          <div className="mt-10 pl-6 md:mt-14 md:pl-10">
            <LeadersMarquee leaders={departmentLeaders} />
          </div>
        </div>
      </section>

      <section id="interview" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Interview" title="社員インタビュー" />
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
