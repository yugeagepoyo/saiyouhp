"use client";

import { useMemo, useState } from "react";
import { faqCategories, faqItems } from "@/data/faq";

export function FaqList() {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
      const matchesKeyword =
        keyword.trim() === "" ||
        item.question.includes(keyword) ||
        item.answer.includes(keyword);
      return matchesCategory && matchesKeyword;
    });
  }, [activeCategory, keyword]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-[var(--color-ink-900)] text-[var(--color-paper-050)]"
                : "bg-[var(--color-paper-100)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]"
            }`}
          >
            すべて
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[var(--color-ink-900)] text-[var(--color-paper-050)]"
                  : "bg-[var(--color-paper-100)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードで探す"
          aria-label="FAQをキーワードで検索"
          className="w-full rounded-full border border-[var(--color-paper-200)] px-4 py-2 text-sm sm:w-56"
        />
      </div>

      <div className="mt-8 divide-y divide-[var(--color-paper-200)]">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-[var(--color-ink-900)]">
                <span className="flex items-center gap-2">
                  {item.question}
                  {item.status === "pending" && (
                    <span className="shrink-0 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] font-normal text-[var(--color-paper-050)]">
                      要確認
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-[var(--color-accent-600)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
                <span className="font-medium text-[var(--color-ink-900)]">A. </span>
                {item.answer}
              </p>
            </details>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-[var(--color-ink-500)]">
            該当する質問が見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  );
}
