/** 大きな英字を横方向に流すマーキー。CSSアニメーションのみで実装し、JS未読み込み時も静止表示される。 */
export function MarqueeText({ text }: { text: string }) {
  return (
    <div className="overflow-hidden py-4" aria-hidden>
      <div
        className="flex w-max motion-safe:animate-[marquee-scroll_28s_linear_infinite]"
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-editorial px-6 text-[14vw] leading-none tracking-wide whitespace-nowrap text-[var(--color-ink-900)]/5 select-none md:text-[9vw]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
