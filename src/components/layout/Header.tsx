import Link from "next/link";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  return (
    <header className="sticky top-0 z-[220] border-b border-[var(--color-paper-200)] bg-[var(--color-paper-050)]/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-[var(--container-page)] items-center px-6 md:h-20 md:px-10">
        <Link href="/" className="font-logo text-[19.6px] tracking-[0.15em] text-[var(--color-ink-900)] md:text-[22.4px]">
          NORBDENCE RECRUIT
        </Link>
      </div>
      {/* ボタン・メニューは HeaderNav 内で document.body へポータルし、
          スクロール位置に関わらず常にビューポート右上に固定表示する */}
      <HeaderNav />
    </header>
  );
}
