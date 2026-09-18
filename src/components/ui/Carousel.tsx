"use client";

import { useRef, type ReactNode } from "react";

/** 軽量カードカルーセル。追加ライブラリを使わず、CSSのscroll-snap + ボタンで実装する。 */
export function Carousel({ children }: { children: ReactNode[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} data-carousel-item className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
            {child}
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label="前のカードを表示"
          onClick={() => scrollByCard(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-paper-200)] text-[var(--color-ink-700)] hover:border-[var(--color-accent-600)]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="次のカードを表示"
          onClick={() => scrollByCard(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-paper-200)] text-[var(--color-ink-700)] hover:border-[var(--color-accent-600)]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
