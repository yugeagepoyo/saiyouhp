import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { jobs } from "@/data/jobs";

export function JobsPickup() {
  const pickups = jobs.filter((job) => job.published).slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Recruit" title="募集中の職種" />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pickups.map((job) => (
            <Link
              key={job.slug}
              href={`/recruit/${job.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-paper-200)] p-6 transition-colors hover:border-[var(--color-accent-500)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--color-paper-100)] px-3 py-1 text-xs text-[var(--color-ink-700)]">
                  {job.category === "mid-career" ? "中途採用" : "新卒採用"}
                </span>
                {(job.isSample || job.isProvisional) && (
                  <span className="rounded-full bg-[var(--color-accent-500)]/15 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                    {job.isSample ? "サンプル" : "仮"}
                  </span>
                )}
              </div>
              <p className="font-bold text-[var(--color-ink-900)] group-hover:text-[var(--color-accent-600)]">
                {job.title}
              </p>
              <p className="text-xs text-[var(--color-ink-500)]">
                {job.employmentType} ／ {job.location}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">{job.summary}</p>
              <p className="mt-auto text-xs font-medium text-[var(--color-ink-500)]">{job.salaryRange}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/recruit" variant="secondary">
            募集職種一覧を見る
          </Button>
        </div>
      </Container>
    </section>
  );
}
