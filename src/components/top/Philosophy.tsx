import { Container } from "@/components/ui/Container";
import { CoreHeading } from "@/components/ui/CoreHeading";
import { Button } from "@/components/ui/Button";
import { companyOverview } from "@/data/company";

export function Philosophy() {
  const { philosophy, management } = companyOverview;

  return (
    <section className="bg-[var(--color-paper-100)] py-24 md:py-32">
      <Container className="max-w-3xl">
        <CoreHeading
          eyebrow={philosophy.title}
          catchphrase={philosophy.catchphrase}
          body={philosophy.body}
        />

        <div className="mt-16 border-t border-[var(--color-paper-200)] pt-16 text-center md:mt-20 md:pt-16">
          {/* 企業理念（CoreHeading）と同じ色・罫線に揃える */}
          <p className="font-display mb-6 text-xs tracking-[0.3em] text-[var(--color-accent-600)] uppercase">
            {management.title}
          </p>
          <span
            aria-hidden
            className="mx-auto mb-8 block h-px w-16 bg-[var(--color-accent-500)]"
          />
          <p className="font-serif-jp text-2xl leading-relaxed font-medium tracking-wide text-[var(--color-ink-900)] md:text-4xl md:leading-relaxed">
            {management.catchphrase}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-base">
            {management.body}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Button href="/about" variant="secondary">
            理念について詳しく見る
          </Button>
        </div>
      </Container>
    </section>
  );
}
