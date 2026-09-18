import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyOverview } from "@/data/company";

export function CompanyOverviewSection() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <SectionHeading eyebrow="Company" title="会社概要" variant="sub" />
        <dl className="mt-8 divide-y divide-[var(--color-paper-200)] border-y border-[var(--color-paper-200)]">
          {companyOverview.overviewTable.map((row) => (
            <div key={row.label} className="grid grid-cols-3 gap-4 py-4 text-sm">
              <dt className="text-[var(--color-ink-500)]">{row.label}</dt>
              <dd className="col-span-2 leading-relaxed whitespace-pre-line text-[var(--color-ink-900)]">
                {row.status === "placeholder" ? (
                  <span className="text-[var(--color-ink-500)]">{row.value}</span>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
