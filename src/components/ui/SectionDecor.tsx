import type { ReactNode } from "react";

export type DecorVariant =
  | "mission"
  | "vision"
  | "value"
  | "about"
  | "people"
  | "work"
  | "recruit"
  | "faq";

const INK = "var(--color-ink-900)";
const GRAY = "var(--color-ink-300)";
const RED = "var(--color-accent-600)";

/**
 * セクション背景の大きなモチーフ。
 * 細い装飾を散らすのではなく、画面からはみ出す大きな形を1つだけ置き、
 * トリミングして見せる。白の余白を十分に残すため、面はいずれも低い不透明度で使う。
 * viewBox は 1200x800 固定、slice で常に画面を覆う（＝形は必ず切り取られる）。
 */
const variants: Record<DecorVariant, ReactNode> = {
  // 右上から大きく入る太い円弧 ＋ 左下の赤いグラデーション
  mission: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="dec-mission-red" cx="0%" cy="100%" r="90%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.22" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-200" y="200" width="900" height="900" fill="url(#dec-mission-red)" />
      <circle cx="1120" cy="60" r="520" fill="none" stroke={GRAY} strokeWidth="110" opacity="0.45" />
    </svg>
  ),

  // 右端から斜めに切り込む、大胆な赤い面
  vision: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="dec-vision-red" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.3" />
          <stop offset="100%" stopColor={RED} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points="1200,-100 1400,900 620,900" fill="url(#dec-vision-red)" />
      <polygon points="1200,-100 1260,-100 700,900 560,900" fill={GRAY} opacity="0.28" />
    </svg>
  ),

  // 左下に沈む大きな黒〜グレーの抽象図形 ＋ 赤を少量
  value: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="dec-value-ink" cx="20%" cy="95%" r="80%">
          <stop offset="0%" stopColor={INK} stopOpacity="0.2" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-300" y="200" width="1100" height="900" fill="url(#dec-value-ink)" />
      <rect x="-120" y="460" width="620" height="620" fill={INK} opacity="0.07" transform="rotate(-24 190 770)" />
      <circle cx="1080" cy="130" r="150" fill={RED} opacity="0.09" />
    </svg>
  ),

  // 大きな薄グレーの幾何学図形（傾けた矩形）を右側に
  about: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect x="720" y="-180" width="700" height="700" fill={GRAY} opacity="0.4" transform="rotate(22 1070 170)" />
      <rect x="640" y="520" width="900" height="520" fill={GRAY} opacity="0.22" />
    </svg>
  ),

  // 非常に薄い、非常に大きな赤い円
  people: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="dec-people-red" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor={RED} stopOpacity="0.12" />
          <stop offset="100%" stopColor={RED} stopOpacity="0.03" />
        </radialGradient>
      </defs>
      <circle cx="240" cy="420" r="620" fill="url(#dec-people-red)" />
    </svg>
  ),

  // 建築のボリュームを思わせる、黒〜グレーの構造的な塊
  work: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect x="820" y="-120" width="300" height="1040" fill={INK} opacity="0.07" />
      <rect x="1000" y="120" width="340" height="820" fill={INK} opacity="0.11" />
      <rect x="640" y="380" width="260" height="560" fill={GRAY} opacity="0.4" />
    </svg>
  ),

  // 赤をいちばん強く。左端から入る大きな赤い面 ＋ 大きな赤い円の一部。
  recruit: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="dec-recruit-red" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.42" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="-100,-100 780,-100 -100,920" fill="url(#dec-recruit-red)" />
      <circle cx="1150" cy="790" r="460" fill={RED} opacity="0.13" />
    </svg>
  ),

  // 一度落ち着かせる。大きく薄いグレーの円をひとつだけ。
  faq: (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <circle cx="960" cy="760" r="480" fill={GRAY} opacity="0.3" />
    </svg>
  ),
};

export function SectionDecor({ variant }: { variant: DecorVariant }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {variants[variant]}
    </div>
  );
}
