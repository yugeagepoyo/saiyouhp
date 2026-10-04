import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
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

/** ABOUT：会社紹介ページへの導線セクション。PCでは「画像｜項目一覧」の横並び。 */
export function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ivory-050)] py-24 md:py-40">
      <SectionDecor variant="about" />
      <Container className="relative">
        <SectionHeading
          eyebrow="About"
          title="ノーブデンスについて"
          description="事業内容から働く環境まで、株式会社ノーブデンスという会社をご紹介します。"
          align="center"
        />

        {/* 画像を左、項目一覧を右に。項目一覧の列は画像より狭く取り、
            1つのレイアウトとしてまとまって見えるよう上下中央で揃える。 */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,29rem)] lg:gap-14">
          <RevealImage
            alt="ノーブデンスのオフィスと社員"
            label="ABOUTビジュアル（仮）"
            aspectClassName="aspect-[4/3]"
            className="rounded-3xl"
            parallax
          />

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
