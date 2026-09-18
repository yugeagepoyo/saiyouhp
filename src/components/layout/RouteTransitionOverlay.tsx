"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "covering" | "revealing";

/**
 * ページ遷移時のブランドカラーワイプ演出。
 * 0.5〜0.8秒に収め、同一ページ内リンク（pathname不変）では発火しない。
 * prefers-reduced-motion では発火させない。
 */
export function RouteTransitionOverlay() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    if (reduceMotionRef.current) return;

    setPhase("covering");
    const t1 = setTimeout(() => setPhase("revealing"), 300);
    const t2 = setTimeout(() => setPhase("idle"), 650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <div
        className="h-full w-full border-t-2 border-[var(--color-accent-500)] bg-[var(--color-ink-900)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: phase === "covering" ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: phase === "revealing" ? "top" : "bottom",
        }}
      />
    </div>
  );
}
