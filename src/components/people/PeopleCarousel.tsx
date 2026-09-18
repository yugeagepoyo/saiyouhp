"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RevealImage } from "@/components/ui/RevealImage";
import { getDepartmentById } from "@/data/departments";
import type { Person } from "@/data/people";

/** 中央のカードを大きく見せるカードカルーセル（CSS scroll-snap + IntersectionObserverのみ、追加ライブラリなし） */
export function PeopleCarousel({ people }: { people: Person[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(people[0]?.slug);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-slug]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce<IntersectionObserverEntry | null>((best, entry) => {
          if (!best || entry.intersectionRatio > best.intersectionRatio) return entry;
          return best;
        }, null);
        if (mostVisible && mostVisible.intersectionRatio > 0.6) {
          setActiveSlug(mostVisible.target.getAttribute("data-slug") ?? undefined);
        }
      },
      { root: container, threshold: [0.6, 0.9] },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [people]);

  return (
    <div
      ref={containerRef}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[10%] py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {people.map((person) => {
        const dept = getDepartmentById(person.departmentId);
        const isActive = person.slug === activeSlug;
        return (
          <Link
            key={person.slug}
            href={`/people/${person.slug}`}
            data-slug={person.slug}
            className={`shrink-0 snap-center transition-all duration-300 ${
              isActive ? "w-[72%] opacity-100 sm:w-[46%] lg:w-[34%]" : "w-[58%] opacity-55 sm:w-[36%] lg:w-[26%]"
            }`}
          >
            {/* aspect-ratio指定だとカード幅（アクティブ/非アクティブ）で写真の高さが変わり、
                下のテキスト位置がカードごとにずれてしまうため、高さを固定して揃えている。 */}
            <RevealImage
              alt={`${dept?.name ?? ""}の${person.name}`}
              label="社員写真（仮）"
              aspectClassName="h-56 sm:h-64 lg:h-72"
              parallax
              revealOnMount
            />
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-paper-100)] px-3 py-1 text-xs text-[var(--color-ink-700)]">
                {dept?.name}
              </span>
              {person.isSample && (
                <span className="rounded-full bg-[var(--color-accent-500)]/30 px-2 py-0.5 text-[10px] text-[var(--color-accent-600)]">
                  サンプル
                </span>
              )}
            </div>
            <p className="mt-2 font-bold text-[var(--color-ink-900)]">{person.name}</p>
            <p className="text-xs text-[var(--color-ink-500)]">{person.joinYear}</p>
          </Link>
        );
      })}
    </div>
  );
}
