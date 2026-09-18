import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberStory } from "@/components/top/NumberStory";
import { companyStats } from "@/data/company";

export function StatsSection() {
  const hasPlaceholder = companyStats.some((stat) => stat.status === "placeholder");

  return (
    <section className="py-20 md:py-16">
      <Container>
        <SectionHeading eyebrow="Numbers" title="数字で見るノーブデンス" />
      </Container>

      <div className="mt-10">
        <NumberStory stats={companyStats} />
      </div>

      {hasPlaceholder && (
        <Container>
          <p className="mt-6 text-xs text-[var(--color-ink-500)]">
            「仮」表示の項目は現在確認中の数値です。確定次第、実数値に更新します。
          </p>
        </Container>
      )}
    </section>
  );
}
