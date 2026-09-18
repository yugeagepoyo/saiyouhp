"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";

/** 幅の広いデスクトップ画面でのみ、左側の余白にテキストナビを表示する */
export function SideRailNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="サイトナビゲーション"
      className="fixed top-1/2 left-8 z-30 hidden -translate-y-1/2 flex-col gap-4 2xl:flex"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs tracking-[0.15em] whitespace-nowrap [writing-mode:vertical-rl] transition-colors ${
              isActive
                ? "text-[var(--color-accent-600)]"
                : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
