import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { jobs } from "@/data/jobs";

const PICKUP_COUNT = 4;

/**
 * RECRUIT：募集情報・採用メッセージ・ENTRY導線。
 * ビジュアル領域は RevealImage のプレースホルダーで確保しており、
 * 写真が確定したら src を渡すだけで差し替えられる。
 */
export function RecruitingInformation() {
  const pickups = jobs.filter((job) => job.published).slice(0, PICKUP_COUNT);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Recruit" title="採用情報" align="center" />

        <div className="mx-auto mt-12 max-w-4xl">
          <RevealImage
            alt="ノーブデンスで働く社員"
            label="採用イメージ（仮）"
            aspectClassName="aspect-[16/9]"
            className="rounded-3xl"
            parallax
          />
        </div>

        <p className="font-serif-jp mx-auto mt-12 max-w-2xl text-center text-2xl leading-relaxed font-bold text-[var(--color-ink-900)] md:text-3xl md:leading-relaxed">
          一緒に未来を創る仲間へ
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {pickups.map((job) => (
            <Link
              key={job.slug}
              href={`/recruit/${job.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] px-5 py-4 transition-colors hover:border-[var(--color-accent-500)]"
            >
              <span>
                <span className="block text-sm font-medium text-[var(--color-ink-900)] group-hover:text-[var(--color-accent-600)]">
                  {job.title}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--color-ink-500)]">
                  {job.employmentType} ／ {job.location}
                </span>
              </span>
              {(job.isSample || job.isProvisional) && (
                <span className="shrink-0 rounded-full bg-[var(--color-accent-500)]/15 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                  {job.isSample ? "サンプル" : "仮"}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/recruit" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
