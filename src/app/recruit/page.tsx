import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { RecruitTabs } from "@/components/recruit/RecruitTabs";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "募集職種一覧",
  description: "株式会社ノーブデンスの募集職種一覧です。中途採用・新卒採用それぞれの求人をご確認いただけます。",
};

export default function RecruitPage() {
  const publishedJobs = jobs.filter((job) => job.published);

  return (
    <>
      <PageHeader
        eyebrow="Recruit"
        title="募集職種一覧"
        description="中途採用・新卒採用の募集職種をご案内します。気になる職種があれば、詳細ページからエントリーください。"
      />

      {/* 職種一覧は募集要項の詳細ページと同じ赤地に、アイボリーの面で載せる。 */}
      <div className="bg-[var(--color-accent-muted)] py-16 md:py-24">
        <Container className="max-w-[1600px] md:px-14">
          <RecruitTabs jobs={publishedJobs} />
        </Container>
      </div>
    </>
  );
}
