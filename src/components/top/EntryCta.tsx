import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ENTRY_HREF } from "@/data/nav";

export function EntryCta() {
  return (
    <section className="py-20 md:py-28">
      <Container className="flex flex-col items-center gap-6 rounded-3xl bg-[var(--color-paper-100)] px-6 py-16 text-center md:px-16">
        <p className="font-display text-xs tracking-[0.25em] text-[var(--color-accent-600)] uppercase">
          Entry
        </p>
        <h2 className="font-serif-jp text-2xl leading-snug font-bold text-[var(--color-ink-900)] md:text-3xl">
          まずはエントリーから、
          <br className="md:hidden" />
          ノーブデンスを知ってください。
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-ink-700)]">
          気になる職種が決まっていなくても大丈夫です。まずはお気軽にエントリーください。
        </p>
        <Button href={ENTRY_HREF} variant="primary">
          ENTRY エントリーする
        </Button>
      </Container>
    </section>
  );
}
