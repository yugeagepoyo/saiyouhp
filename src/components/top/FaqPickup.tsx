import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { faqItems } from "@/data/faq";
import { SectionDecor } from "@/components/ui/SectionDecor";

/** TOPに出す件数。FAQページと同じ @/data/faq を参照し、TOP側で文言を持たない。 */
const PICKUP_COUNT = 4;

export function FaqPickup() {
  // 制度内容が未確定（status: "pending"）の項目はTOPの抜粋には出さない。
  const pickups = faqItems.filter((item) => item.status !== "pending").slice(0, PICKUP_COUNT);

  return (
    <section className="relative overflow-hidden bg-[var(--color-ivory-050)] py-24 md:py-40">
      <SectionDecor variant="faq" />
      <Container className="relative max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="よくある質問" align="center" />

        {/* 1問＝1ボックス。開いている質問は質問文をアクセントカラーにし、
            細い罫線で回答と分ける。角丸は控えめにしてモード感に合わせる。 */}
        <div className="mt-12 space-y-3">
          {pickups.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] transition-colors open:border-[var(--color-accent-500)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-[var(--color-ink-900)] transition-colors group-open:text-[var(--color-accent-600)]">
                {faq.question}
                <span className="shrink-0 text-[var(--color-accent-600)] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mx-6 border-t border-[var(--color-paper-200)] pb-5">
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-700)]">
                  <span className="font-medium text-[var(--color-ink-900)]">A. </span>
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/faq" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
