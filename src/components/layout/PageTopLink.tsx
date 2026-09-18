"use client";

export function PageTopLink() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-2 text-xs tracking-wide text-white/70 hover:text-white"
    >
      PAGE TOP
      <span aria-hidden>↑</span>
    </button>
  );
}
