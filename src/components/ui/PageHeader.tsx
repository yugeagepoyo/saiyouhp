import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-[var(--color-paper-200)] bg-[var(--color-paper-100)] py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="font-editorial text-4xl font-medium tracking-wide text-[var(--color-accent-600)] uppercase sm:text-5xl md:text-6xl">
            {eyebrow}
          </p>
          <h1 className="font-serif-jp mt-3 text-lg font-bold text-[var(--color-ink-900)] md:text-xl">{title}</h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-700)] md:text-base">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
