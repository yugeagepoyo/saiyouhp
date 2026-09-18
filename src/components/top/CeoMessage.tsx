import { Container } from "@/components/ui/Container";
import { RevealImage } from "@/components/ui/RevealImage";

export function CeoMessage() {
  return (
    <section className="section-dark py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
        <RevealImage alt="代表者" label="代表者写真（仮）" aspectClassName="aspect-[3/4]" />
        <div>
          <p className="font-display mb-4 text-xs tracking-[0.25em] text-[var(--color-accent-500)] uppercase">
            Message
          </p>
          <p className="font-serif-jp text-xl leading-relaxed font-medium md:text-2xl md:leading-relaxed">
            若い会社だからこそ、一人ひとりの挑戦がそのまま会社の成長につながります。
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[var(--color-paper-100)]/80">
            代表メッセージ本文（後日共有いただく想定のプレースホルダーです）。ノーブデンスが大切にしている考え方や、これから入社する仲間へ伝えたい思いをここに掲載します。
          </p>
          <p className="mt-6 text-sm font-bold">代表取締役　氏名（仮）</p>
        </div>
      </Container>
    </section>
  );
}
