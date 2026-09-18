import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { Button } from "@/components/ui/Button";

const points = [
  { title: "オフィス環境", text: "五感で楽しめる、居心地の良いオフィスづくりを進めています。" },
  { title: "研修・成長支援", text: "未経験からでも安心して成長できる研修体制を用意しています。" },
  { title: "福利厚生", text: "社員が長く安心して働けるよう、福利厚生の充実に取り組んでいます。" },
];

export function WorkEnvironment() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <RevealImage alt="オフィスの様子" label="オフィス写真（仮）" aspectClassName="aspect-[4/3]" parallax />

        <div>
          <SectionHeading eyebrow="Environment" title="働きやすさと、挑戦できる環境を両立する。" />
          <ul className="mt-8 space-y-6">
            {points.map((point) => (
              <li key={point.title} className="border-l-2 border-[var(--color-accent-500)] pl-4">
                <p className="font-bold text-[var(--color-ink-900)]">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-700)]">{point.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              働く環境について詳しく見る
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
