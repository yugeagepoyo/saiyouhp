"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navItems, ENTRY_HREF } from "@/data/nav";
import { NavIcon } from "./NavIcon";
import { EASE_STANDARD } from "@/lib/motion";

export function HeaderNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // ヘッダーの backdrop-blur が fixed 要素の基準（containing block）になってしまうため、
  // メニューパネルは body 直下へポータルして描画する。
  // setTimeout のコールバック内で setState することで、エフェクト内での同期的な setState を避ける。
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  function close() {
    setOpen(false);
  }

  const menu = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="menu-backdrop"
            onClick={close}
            className="fixed inset-0 z-[190] bg-[var(--color-ink-900)]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.nav
            key="menu-panel"
            aria-label="サイトメニュー"
            className="section-dark fixed inset-y-0 right-0 z-[200] h-dvh w-full max-w-sm overflow-y-auto p-8 pt-24"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const hasChildren = !!item.children?.length;
                const isExpanded = expanded === item.href;
                return (
                  <li key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={close}
                        className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors ${
                          isActive
                            ? "bg-white/10 text-[var(--color-accent-500)]"
                            : "text-[var(--color-paper-050)] hover:bg-white/5"
                        }`}
                      >
                        <NavIcon name={item.icon} />
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`${item.label}の詳細を${isExpanded ? "閉じる" : "開く"}`}
                          aria-expanded={isExpanded}
                          onClick={() => setExpanded(isExpanded ? null : item.href)}
                          className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-paper-050)]/70"
                        >
                          <span
                            className={`inline-block transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          >
                            ⌄
                          </span>
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE_STANDARD }}
                            className="overflow-hidden pl-10"
                          >
                            {item.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={close}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-paper-050)]/80 hover:bg-white/5"
                                >
                                  <NavIcon name={child.icon} className="h-4 w-4" />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
              <li className="mt-4 border-t border-white/10 pt-4">
                <Link
                  href={ENTRY_HREF}
                  onClick={close}
                  className="flex items-center gap-3 rounded-lg bg-[var(--color-accent-500)] px-3 py-3 text-base font-semibold text-[var(--color-ink-900)]"
                >
                  <NavIcon name="entry" />
                  ENTRY エントリーする
                </Link>
              </li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  const trigger = (
    <button
      type="button"
      aria-label={open ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      // IntroSplash（z-[300]）より確実に手前に出し、初回表示の演出中も含めて
      // ページ最上部から常にクリックできる状態にする。
      className="fixed top-3 right-5 z-[310] flex h-12 w-12 flex-col items-center justify-center gap-[7.5px] md:top-5 md:right-8"
    >
      <span
        className={`h-px w-[30px] bg-[var(--color-ink-900)] transition-transform duration-300 ${open ? "translate-y-[4.4px] rotate-45" : ""}`}
      />
      <span
        className={`h-px w-[30px] bg-[var(--color-ink-900)] transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`h-px w-[30px] bg-[var(--color-ink-900)] transition-transform duration-300 ${open ? "-translate-y-[6.9px] -rotate-45" : ""}`}
      />
    </button>
  );

  // ヘッダーの backdrop-blur が position:fixed 要素の基準（containing block）になってしまうため、
  // ボタン・メニューともに body 直下へポータルし、常にビューポート右上に固定表示する。
  return mounted ? createPortal(<>{trigger}{menu}</>, document.body) : null;
}
