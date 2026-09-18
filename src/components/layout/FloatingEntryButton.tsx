"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ENTRY_HREF } from "@/data/nav";

/** 常に右下に表示する丸いエントリーボタン。問い合わせボタンと誤認しないよう明示する。 */
export function FloatingEntryButton() {
  const pathname = usePathname();
  if (pathname?.startsWith(ENTRY_HREF)) return null;

  return (
    <Link
      href={ENTRY_HREF}
      className="fixed right-5 bottom-5 z-40 flex h-22 w-22 flex-col items-center justify-center gap-1 rounded-full bg-[var(--color-accent-600)] text-[var(--color-paper-050)] shadow-lg shadow-[var(--color-accent-600)]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl md:right-8 md:bottom-8 md:h-24 md:w-24"
    >
      <span className="font-entry text-base leading-none font-normal tracking-wide md:text-lg">ENTRY</span>
      <span className="text-[8px] leading-none md:text-[9px]">応募する</span>
    </Link>
  );
}
