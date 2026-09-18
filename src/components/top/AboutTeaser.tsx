import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";

/** /about 内の各セクションへの導線。アンカーは about ページ側の id と対応。 */
const aboutTopics = [
  { label: "事業内容", href: "/about#business" },
  { label: "数字で見るノーブデンス", href: "/about#numbers" },
  { label: "職場環境", href: "/about#workplace" },
  { label: "社員の成長とキャリア形成", href: "/about#growth" },
  { label: "地域や社会への還元", href: "/about#community" },
  { label: "福利厚生", href: "/about#benefits" },
];

/** ABOUT：会社紹介ページへの導線セクション。 */
export function AboutTeaser() {
  return (
    <section className="bg-[var(--color-paper-100)] py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="ノーブデンスについて"
          description="事業内容から働く環境まで、株式会社ノーブデンスという会社をご紹介します。"
          align="center"
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <RevealImage
            alt="ノーブデンスのオフィスと社員"
            label="ABOUTビジュアル（仮）"
            aspectClassName="aspect-[16/9]"
            className="rounded-3xl"
            parallax
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {aboutTopics.map((topic) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] px-5 py-4 text-sm font-medium text-[var(--color-ink-900)] transition-colors hover:border-[var(--color-accent-500)]"
              >
                {topic.label}
                <span className="text-[var(--color-accent-600)]">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button href="/about" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
