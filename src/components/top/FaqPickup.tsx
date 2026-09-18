import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { faqItems } from "@/data/faq";

/** TOPに出す件数。FAQページと同じ @/data/faq を参照し、TOP側で文言を持たない。 */
const PICKUP_COUNT = 4;

export function FaqPickup() {
  // 制度内容が未確定（status: "pending"）の項目はTOPの抜粋には出さない。
  const pickups = faqItems.filter((item) => item.status !== "pending").slice(0, PICKUP_COUNT);

  return (
    <section className="bg-[var(--color-paper-100)] py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="よくある質問" align="center" />
        <div className="mt-10 divide-y divide-[var(--color-paper-200)]">
          {pickups.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--color-ink-900)]">
                {faq.question}
                <span className="shrink-0 text-[var(--color-accent-600)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
                <span className="font-medium text-[var(--color-ink-900)]">A. </span>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/faq" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
