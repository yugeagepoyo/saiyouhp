import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectionDecor } from "@/components/ui/SectionDecor";

/** /about 内の各セクションへの導線。アンカーは about ページ側の id と対応。 */
const aboutTopics = [
  { label: "事業内容", href: "/about#business" },
  { label: "数字で見るノーブデンス", href: "/about#numbers" },
  { label: "職場環境", href: "/about#workplace" },
  { label: "社員の成長とキャリア形成", href: "/about#growth" },
  { label: "地域や社会への還元", href: "/about#community" },
  { label: "福利厚生", href: "/about#benefits" },
];

/** ABOUT：会社紹介ページへの導線セクション。項目一覧のみを中央に並べる。 */
export function AboutTeaser() {
  return (
    <section className="section-blend blend-ivory-050 relative overflow-hidden py-24 md:py-40">
      <SectionDecor variant="about" />
      <Container className="relative">
        <SectionHeading eyebrow="About" title="ノーブデンスについて" align="center" />

        {/* 写真は使わず、項目一覧だけを中央に置く。 */}
        <div className="mx-auto mt-14 w-full max-w-2xl">
          <ul className="flex flex-col gap-3">
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
        </div>

        <div className="mt-12 text-center">
          <Button href="/about" variant="secondary">
            View more
          </Button>
        </div>
      </Container>
    </section>
  );
}
