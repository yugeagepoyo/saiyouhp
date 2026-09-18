import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageTopLink } from "./PageTopLink";
import { CORPORATE_SITE_URL, ENTRY_HREF } from "@/data/nav";

export function Footer() {
  return (
    <footer className="section-dark pb-8">
      {/* 全ページ最下部の共通エントリーエリア */}
      <div className="border-b border-white/10 py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="font-display text-sm tracking-[0.2em] text-[var(--color-accent-500)] uppercase">
            Join Us
          </p>
          <h2 className="font-serif-jp text-2xl leading-snug font-bold text-[var(--color-paper-050)] md:text-3xl">
            ノーブデンスで、
            <br className="md:hidden" />
            品格と挑戦を積み重ねるキャリアを。
          </h2>
          <div className="mt-2">
            <Button
              href={ENTRY_HREF}
              variant="primary"
              // Button側のprimaryバリアント（bg-ink-900）とTailwindのクラス生成順によっては
              // 通常のbg-*指定が競合して負けることがあるため、!（important）で確実に上書きする。
              className="group !bg-[var(--color-accent-600)] !text-[var(--color-paper-050)] transition-transform duration-300 hover:!bg-[var(--color-paper-050)] hover:!text-[var(--color-accent-600)] hover:scale-105"
            >
              ENTRY エントリーする
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-logo text-sm tracking-[0.15em] text-[var(--color-paper-050)]">
            NORBDENCE RECRUIT
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/60">株式会社ノーブデンス 採用情報サイト</p>
          <a
            href={CORPORATE_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-white/70 underline underline-offset-4 hover:text-white"
          >
            コーポレートサイトへ
          </a>
        </div>

        <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:gap-3">
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} NORBDENCE Co., Ltd.</p>
          <PageTopLink />
        </div>
      </Container>
    </footer>
  );
}
