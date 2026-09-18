import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkDiagram } from "@/components/work/WorkDiagram";
import { WorkJobsExplorer } from "@/components/work/WorkJobsExplorer";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "仕事を知る",
  description: "営業・事務・建設・解体産廃・財務戦略・社長室、6つの部署が連携して一つの案件を進める職種相関図です。",
};

export default function WorkPage() {
  const publishedJobs = jobs.filter((job) => job.published);

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="仕事を知る"
        description="6つの部署が専門性を持ち寄って仕事を進めます。部署をクリックすると、役割や仕事内容、関連する社員・募集職種を確認できます。"
      />

      <section id="departments" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Diagram"
            title="会社全体の職種関係を知る"
            description="6つの部署がどう連携しているかの全体像です。部署をクリックすると役割や関連する社員・募集職種を確認できます。"
          />
          <div className="mt-10">
            <WorkDiagram />
          </div>
        </Container>
      </section>

      <section id="jobs" className="scroll-mt-20 bg-[var(--color-paper-100)] py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Find Your Role"
            title="自分に合う仕事を探す"
            description="「総合職」「事務職」の大分類から、気になる職種を探せます。"
          />
          <div className="mt-10">
            <WorkJobsExplorer jobs={publishedJobs} />
          </div>
        </Container>
      </section>
    </>
  );
}
