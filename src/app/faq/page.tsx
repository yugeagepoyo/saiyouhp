import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/faq/FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  description: "応募・選考、仕事内容、働き方、研修・キャリア、福利厚生、会社についてのよくある質問です。",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="よくある質問" description="カテゴリーやキーワードから、気になる質問を探せます。" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <FaqList />
        </Container>
      </section>
    </>
  );
}
