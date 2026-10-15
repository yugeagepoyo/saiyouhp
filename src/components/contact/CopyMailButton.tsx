"use client";

import { useEffect, useRef, useState } from "react";

/**
 * メールアドレスをクリップボードへコピーするアイコンボタン。
 * 四角が2枚重なった一般的なコピーアイコンで、成功時だけ短く案内を出す。
 */
export function CopyMailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // クリップボードが使えない環境では選択してコピーできるようフォールバックする。
      const area = document.createElement("textarea");
      area.value = email;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={copy}
        aria-label="メールアドレスをコピー"
        className="text-[var(--color-ink-500)] transition-colors hover:text-[var(--color-accent-600)]"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="11" height="11" rx="1.6" />
          <path d="M15 5.6V4.6A1.6 1.6 0 0 0 13.4 3H4.6A1.6 1.6 0 0 0 3 4.6v8.8A1.6 1.6 0 0 0 4.6 15h1" />
        </svg>
      </button>
      {/* 表示されてもアドレスの位置がずれないよう、重ねて出す。 */}
      <span
        aria-live="polite"
        className={`pointer-events-none absolute top-full right-0 mt-2 text-xs whitespace-nowrap text-[var(--color-accent-600)] transition-opacity duration-300 md:text-sm ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        コピーしました
      </span>
    </span>
  );
}
