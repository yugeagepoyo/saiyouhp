"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { searchSite, type SearchEntry } from "@/data/searchIndex";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * サイト内ワード検索。追加ライブラリなしの単純な部分一致検索。
 * ヘッダー右上（ハンバーガーの左隣）の検索アイコンから開く、ミニマルなオーバーレイUI。
 */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setResults(searchSite(keyword)), 120);
    return () => clearTimeout(id);
  }, [keyword, open]);

  function close() {
    setOpen(false);
    setKeyword("");
    setResults([]);
  }

  const trigger = (
    <button
      type="button"
      aria-label="サイト内検索を開く"
      onClick={() => setOpen(true)}
      className="fixed top-3 right-16 z-[310] flex h-12 w-12 items-center justify-center text-[var(--color-ink-900)] md:top-5 md:right-20"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-[25px] w-[25px]">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.5-4.5" />
      </svg>
    </button>
  );

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="search-backdrop"
            onClick={close}
            className="fixed inset-0 z-[290] bg-[var(--color-ink-900)]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            key="search-panel"
            role="dialog"
            aria-label="サイト内検索"
            className="fixed inset-x-0 top-0 z-[295] mx-auto max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-b-2xl bg-[var(--color-paper-050)] p-6 shadow-xl md:top-8 md:rounded-2xl"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: EASE_STANDARD }}
          >
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="h-5 w-5 shrink-0 text-[var(--color-ink-500)]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.5-4.5" />
              </svg>
              <input
                type="search"
                autoFocus
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="職種・仕事内容・福利厚生・FAQなどをキーワードで検索"
                aria-label="サイト内をキーワードで検索"
                className="w-full bg-transparent text-base text-[var(--color-ink-900)] outline-none placeholder:text-[var(--color-ink-500)]"
              />
              <button
                type="button"
                aria-label="検索を閉じる"
                onClick={close}
                className="shrink-0 text-sm text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              >
                閉じる
              </button>
            </div>

            <div className="mt-6">
              {keyword.trim() === "" ? (
                <p className="text-sm text-[var(--color-ink-500)]">
                  例：「施工管理」「休日」「資格」「未経験」「育休」など
                </p>
              ) : results.length > 0 ? (
                <ul className="divide-y divide-[var(--color-paper-200)]">
                  {results.map((r, i) => (
                    <li key={`${r.url}-${i}`}>
                      <Link
                        href={r.url}
                        onClick={close}
                        className="block py-3 hover:bg-[var(--color-paper-100)]"
                      >
                        <p className="text-xs text-[var(--color-accent-600)]">{r.category}</p>
                        <p className="mt-1 font-medium text-[var(--color-ink-900)]">{r.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--color-ink-700)]">{r.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--color-ink-500)]">該当する内容が見つかりませんでした。</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return mounted
    ? createPortal(
        <>
          {trigger}
          {overlay}
        </>,
        document.body,
      )
    : null;
}
