import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { CopyMailButton } from "@/components/contact/CopyMailButton";
import { RECRUIT_EMAIL, RECRUIT_TEL, RECRUIT_TEL_LINK } from "@/data/contact";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社ノーブデンスの採用に関するお問い合わせ窓口です。",
};

/** 受話器アイコン */
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-[1.01em] w-[1.01em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.9 18.6 5.4 13.1 5 4.9A1.5 1.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

/** メールアイコン */
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-[0.94em] w-[0.94em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.6 6.6 8.4 6 8.4-6" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="お問い合わせ" />

      <section className="py-16 md:py-24">
        <Container className="max-w-3xl text-center">
          <p className="text-base leading-loose font-medium text-[var(--color-ink-900)] md:text-lg">
            採用に関するご質問は、お電話またはメールにてお気軽にお問い合わせください。
          </p>

          <div className="mt-14 space-y-14 md:mt-20 md:space-y-16">
            <div>
              <p className="font-heading-en text-base tracking-[0.25em] text-[var(--color-accent-600)] uppercase md:text-lg">
                Tel
              </p>
              <p className="mt-5">
                <a
                  href={RECRUIT_TEL_LINK}
                  className="font-heading-en inline-flex items-center justify-center gap-3 text-[clamp(1.9rem,6vw,3.25rem)] leading-none font-semibold tracking-[-0.01em] text-[var(--color-ink-900)] transition-colors hover:text-[var(--color-accent-600)]"
                >
                  <PhoneIcon />
                  {RECRUIT_TEL}
                </a>
              </p>
            </div>

            <span aria-hidden className="mx-auto block h-px w-full bg-[var(--color-paper-200)]" />

            <div>
              <p className="font-heading-en text-base tracking-[0.25em] text-[var(--color-accent-600)] uppercase md:text-lg">
                Mail
              </p>
              {/* メールアドレスの右隣にコピーアイコンを置く */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                {/* 右端のコピーアイコンと同じ幅を左にも置き、アドレスが中央に見えるようにする。 */}
                <span aria-hidden className="block h-6 w-6 shrink-0" />
                <a
                  href={`mailto:${RECRUIT_EMAIL}`}
                  className="font-heading-en inline-flex items-center gap-3 text-[clamp(1.4rem,4.5vw,2.5rem)] leading-none font-semibold tracking-[-0.01em] break-all text-[var(--color-ink-900)] transition-colors hover:text-[var(--color-accent-600)]"
                >
                  <MailIcon />
                  {RECRUIT_EMAIL}
                </a>
                <CopyMailButton email={RECRUIT_EMAIL} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
