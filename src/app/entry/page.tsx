import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { EntryForm } from "@/components/forms/EntryForm";
import { getPublishedJobs, jobs as allJobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "エントリー",
  description: "株式会社ノーブデンスの求人へのエントリーフォームです。",
};

export default async function EntryPage(props: PageProps<"/entry">) {
  const searchParams = await props.searchParams;
  const jobParam = searchParams.job;
  const initialJobSlug = typeof jobParam === "string" ? jobParam : undefined;

  const publishedJobs = [...getPublishedJobs("mid-career"), ...getPublishedJobs("new-grad")];
  const jobs = publishedJobs.length > 0 ? publishedJobs : allJobs.filter((j) => j.published);

  return (
    <>
      <PageHeader
        eyebrow="Entry"
        title="エントリー"
        description="気になる職種が決まっていなくても大丈夫です。まずはお気軽にエントリーください。"
      />
      <section className="py-16 md:py-24">
        <Container className="max-w-xl">
          <EntryForm jobs={jobs} initialJobSlug={initialJobSlug} />
        </Container>
      </section>
    </>
  );
}
