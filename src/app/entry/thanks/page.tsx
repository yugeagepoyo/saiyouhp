import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "エントリー完了",
  robots: { index: false, follow: false },
};

export default function EntryThanksPage() {
  return (
    <section className="py-24 text-center md:py-32">
      <Container className="max-w-lg">
        <p className="font-display mb-4 text-xs tracking-[0.25em] text-[var(--color-accent-600)] uppercase">
          Thank You
        </p>
        <h1 className="font-serif-jp text-2xl font-bold text-[var(--color-ink-900)] md:text-3xl">
          エントリーありがとうございます
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink-700)]">
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          ご入力いただいたメールアドレス宛に確認メールをお送りしておりますので、
          <br className="md:hidden" />
          あわせてご確認ください。
        </p>
        <div className="mt-10">
          <Button href="/" variant="secondary">
            TOPページへ戻る
          </Button>
        </div>
      </Container>
    </section>
  );
}
