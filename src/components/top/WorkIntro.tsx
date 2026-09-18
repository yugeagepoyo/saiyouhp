import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { Button } from "@/components/ui/Button";

export function WorkIntro() {
  return (
    <section className="section-dark overflow-hidden py-24 md:py-28">
      <MarqueeText text="REAL ESTATE / CONSTRUCTION / DEMOLITION" />
      <Container className="mt-8">
        <SectionHeading
          eyebrow="Our Business"
          title="不動産・建設・解体産廃。複数の事業が連携して、一つの仕事をつくる。"
          description="営業が案件をつくり、建設が形にし、解体産廃が次の可能性を拓く。事務・財務・経営がそれを支える。部署を越えた連携こそが、ノーブデンスの仕事の面白さです。"
          className="[&_p]:text-[var(--color-paper-100)]/80 [&_h2]:text-[var(--color-paper-050)]"
        />
        <div className="mt-8">
          <Button href="/work" variant="secondary" className="border-white/40 text-white hover:bg-white hover:text-[var(--color-ink-900)]">
            職種相関図を見る
          </Button>
        </div>
      </Container>
    </section>
  );
}
