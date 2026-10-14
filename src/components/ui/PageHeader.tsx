import Link from "next/link";

/**
 * 各ページの見出し。
 * パンくず → 巨大な英字タイトル → 日本語のページ名 → 説明文、の順に左揃えで積む。
 * 本文セクションより広いコンテナを使い、英字は画面幅に比例させて大きく見せる。
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  // 文字数が多いページ名は一段小さくして、1行に収まるようにする。
  const titleSize =
    eyebrow.length > 10
      ? "text-[clamp(2.75rem,8.5vw,7rem)]"
      : "text-[clamp(3.5rem,12vw,10rem)]";

  return (
    <section className="section-blend blend-paper-100 pt-16 pb-24 md:pt-28 md:pb-36">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-14">
        <nav aria-label="パンくず">
          <ol className="font-heading-en flex items-center gap-2 text-[11px] tracking-[0.25em] text-[var(--color-ink-500)] uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-[var(--color-accent-600)]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">{eyebrow}</li>
          </ol>
        </nav>

        <p
          className={`font-heading-en mt-10 ${titleSize} leading-[0.92] font-semibold tracking-[-0.02em] text-[var(--color-ink-900)] uppercase md:mt-14`}
        >
          {eyebrow}
        </p>

        <h1 className="font-serif-jp mt-8 text-2xl font-bold text-[var(--color-ink-900)] md:mt-12 md:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="jp-pretty mt-8 max-w-2xl text-sm leading-loose text-[var(--color-ink-700)] md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
