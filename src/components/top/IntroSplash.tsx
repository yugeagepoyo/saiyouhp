"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * NORBDENCEロゴ（jpg/norbdenceframelogo.svg）の各文字のパス。
 * 元データは同一パスが2グループ重複していたため、1組だけを使用している。
 */
const LOGO_PATHS = [
  "M118.46,65.79h29.59l38.61,56.73v-56.73h29.87v102.54h-29.87l-38.4-56.3v56.3h-29.8v-102.54Z",
  "M240.76,117.13c0-16.74,4.66-29.77,13.99-39.1,9.33-9.33,22.31-13.99,38.96-13.99s30.22,4.58,39.45,13.74c9.23,9.16,13.85,22,13.85,38.51,0,11.98-2.02,21.81-6.05,29.48-4.03,7.67-9.86,13.64-17.49,17.91-7.62,4.27-17.13,6.4-28.5,6.4s-21.14-1.84-28.71-5.53c-7.58-3.68-13.72-9.51-18.43-17.49-4.71-7.97-7.06-17.95-7.06-29.94ZM272.44,117.27c0,10.35,1.92,17.79,5.77,22.31,3.85,4.52,9.08,6.79,15.7,6.79s12.08-2.21,15.81-6.65c3.73-4.43,5.6-12.38,5.6-23.85,0-9.65-1.95-16.71-5.84-21.16-3.89-4.45-9.17-6.68-15.84-6.68s-11.52,2.26-15.39,6.79c-3.87,4.52-5.81,12.01-5.81,22.45Z",
  "M371.65,168.33v-102.54h52.81c9.79,0,17.28.84,22.45,2.52s9.35,4.79,12.52,9.34c3.17,4.55,4.76,10.08,4.76,16.61,0,5.69-1.21,10.6-3.64,14.72s-5.76,7.47-10.01,10.04c-2.71,1.63-6.42,2.99-11.13,4.06,3.77,1.26,6.52,2.52,8.25,3.78,1.17.84,2.85,2.64,5.07,5.39,2.21,2.75,3.69,4.88,4.44,6.37l15.34,29.71h-35.8l-16.94-31.34c-2.15-4.06-4.06-6.69-5.74-7.9-2.29-1.58-4.87-2.38-7.76-2.38h-2.8v41.62h-31.83ZM403.48,107.34h13.36c1.45,0,4.24-.47,8.39-1.4,2.1-.42,3.81-1.49,5.14-3.22,1.33-1.72,1.99-3.71,1.99-5.95,0-3.31-1.05-5.85-3.15-7.62-2.1-1.77-6.04-2.66-11.82-2.66h-13.92v20.84Z",
  "M489.89,65.79h59.31c9.89,0,17.47,2.45,22.77,7.34,5.29,4.9,7.94,10.96,7.94,18.19,0,6.06-1.89,11.26-5.67,15.6-2.52,2.89-6.2,5.18-11.05,6.85,7.37,1.77,12.79,4.82,16.26,9.13,3.47,4.31,5.21,9.73,5.21,16.26,0,5.32-1.24,10.1-3.71,14.34-2.47,4.24-5.85,7.6-10.14,10.07-2.66,1.54-6.67,2.66-12.03,3.36-7.13.93-11.87,1.4-14.2,1.4h-54.7v-102.54ZM521.86,106.01h13.78c4.94,0,8.38-.85,10.32-2.55,1.93-1.7,2.9-4.16,2.9-7.38,0-2.98-.97-5.32-2.9-6.99-1.94-1.68-5.31-2.52-10.11-2.52h-13.99v19.45ZM521.86,146.3h16.16c5.46,0,9.3-.97,11.54-2.9,2.24-1.93,3.36-4.54,3.36-7.8,0-3.03-1.11-5.47-3.32-7.31-2.22-1.84-6.1-2.76-11.65-2.76h-16.09v20.77Z",
  "M608.83,65.79h47.07c9.28,0,16.78,1.26,22.49,3.78,5.71,2.52,10.43,6.13,14.16,10.84,3.73,4.71,6.44,10.19,8.11,16.44,1.68,6.25,2.52,12.87,2.52,19.87,0,10.96-1.25,19.46-3.74,25.5-2.5,6.04-5.96,11.1-10.39,15.18-4.43,4.08-9.19,6.8-14.27,8.15-6.95,1.87-13.24,2.8-18.89,2.8h-47.07v-102.54ZM640.51,89.01v56.03h7.76c6.62,0,11.33-.73,14.13-2.2s4.99-4.03,6.58-7.69c1.58-3.66,2.38-9.59,2.38-17.8,0-10.86-1.77-18.3-5.32-22.31-3.54-4.01-9.42-6.02-17.63-6.02h-7.9Z",
  "M726.92,65.79h84.92v21.89h-53.16v16.3h49.31v20.91h-49.31v20.21h54.7v23.22h-86.45v-102.54Z",
  "M837.82,65.79h29.59l38.61,56.73v-56.73h29.87v102.54h-29.87l-38.4-56.3v56.3h-29.8v-102.54Z",
  "M1032.37,126.36l27.77,8.39c-1.87,7.79-4.8,14.29-8.81,19.51-4.01,5.22-8.99,9.16-14.93,11.82s-13.51,3.99-22.7,3.99c-11.15,0-20.25-1.62-27.31-4.86s-13.16-8.93-18.29-17.09-7.69-18.59-7.69-31.32c0-16.96,4.51-30,13.53-39.11s21.79-13.67,38.3-13.67c12.92,0,23.07,2.61,30.46,7.83,7.39,5.22,12.88,13.24,16.47,24.06l-27.98,6.23c-.98-3.12-2.01-5.41-3.08-6.85-1.77-2.42-3.94-4.29-6.5-5.6-2.57-1.31-5.43-1.96-8.6-1.96-7.18,0-12.68,2.89-16.51,8.66-2.89,4.29-4.34,11.02-4.34,20.19,0,11.37,1.72,19.16,5.18,23.37,3.45,4.21,8.3,6.32,14.55,6.32s10.64-1.7,13.74-5.11c3.1-3.4,5.35-8.35,6.75-14.83Z",
  "M1082.62,65.79h84.92v21.89h-53.16v16.3h49.31v20.91h-49.31v20.21h54.7v23.22h-86.45v-102.54Z",
] as const;

/** 元SVGのviewBoxは余白が広いため、実際の字形の範囲に合わせて詰めている。 */
const LOGO_VIEWBOX = "112 59 1063 116";

/** 全パスをほぼ同時に描き始める。文字順が見えないよう、開始のばらつきはこの範囲に収める。 */
const LOGO_DELAY_SPREAD_S = 0.22;
const LOGO_DURATION_MIN_S = 0.95;
const LOGO_DURATION_RANGE_S = 0.18;
/** 最も遅いパスが描き終わる時刻。輪郭の完成時点。 */
const LOGO_OUTLINE_END_S = LOGO_DELAY_SPREAD_S + LOGO_DURATION_MIN_S + LOGO_DURATION_RANGE_S;
/** 輪郭だけの状態を見せる静止時間 */
const LOGO_OUTLINE_HOLD_S = 0.4;
/** 塗りは全パス共通のタイミング。輪郭が完全に描き終わってから始める。 */
const FILL_DELAY_S = LOGO_OUTLINE_END_S + LOGO_OUTLINE_HOLD_S;
const FILL_DURATION_S = 0.7;

const SESSION_KEY = "norbdence-intro-played";

type Phase = "logo" | "logoOut" | "dissolve" | "done";

/** 黒ロゴ完成 → 表示キープ → ロゴfade-out → 白のまま「ため」 → Blur Dissolve のタイミング（ms） */
const LOGO_HOLD_S = 0.3;
const LOGO_OUT_AT_MS = Math.round((FILL_DELAY_S + FILL_DURATION_S + LOGO_HOLD_S) * 1000);
/** ロゴはゆっくり消す */
const LOGO_FADE_MS = 650;
/** ロゴが消えきってから背景が動き出すまでの間 */
const VEIL_HOLD_MS = 220;
const DISSOLVE_AT_MS = LOGO_OUT_AT_MS + LOGO_FADE_MS + VEIL_HOLD_MS;
const DISSOLVE_MS = 1100;
const DONE_AT_MS = DISSOLVE_AT_MS + DISSOLVE_MS;

/** SSRでの警告を避けつつ、クライアントでは描画前にセッション判定を行うためのレイアウトエフェクト。 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** 決定的な擬似乱数。Math.randomだとSSRとクライアントで値がずれ、
 *  ハイドレーション不一致になるため、インデックスから毎回同じ値を導く。 */
function pseudoRandom(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * 初回ランディング演出。
 * 白地にNORBDENCEロゴの輪郭が描かれ → 輪郭のまま静止 → 黒の塗りがゆっくり入り →
 * ロゴが消え → 白幕がblurしながら抜け、裏に用意済みのTOP本編が現れる。
 *
 * TOP本編は最初から下に描画されているため、演出終了時に読み込みや白フラッシュは発生しない。
 * 再生はサイトを開いた最初の1回のみ（sessionStorage）。
 */
export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("logo");
  const [reduced, setReduced] = useState(false);
  // CSSアニメーションはハイドレーション前の初回ペイント時点で走り始めてしまうため、
  // 「再生する」とクライアントが判断するまでは白幕だけを出し、ロゴは伏せておく。
  // これにより2回目以降の訪問で演出が一瞬見えてしまうことを防ぐ。
  const [started, setStarted] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  // このマウントで再生済みフラグを書き込んだかどうか。
  // refは同一マウント内で保持され再マウントでリセットされるため、
  // 「StrictModeによるエフェクトの二重実行」と「再マウント」を区別できる。
  const wroteMarkerRef = useRef(false);

  function finish() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("done");
  }

  useIsomorphicLayoutEffect(() => {
    // 自分で書き込んだ直後の再実行（StrictModeの二重実行）は、判定をやり直さずそのまま再生する。
    if (!wroteMarkerRef.current) {
      let alreadyPlayed = false;
      try {
        alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        // プライベートモード等でsessionStorageが使えない場合は、演出を再生する側に倒す。
      }

      // 下層ページからTOPへ戻った場合など、同一セッションの2回目以降は描画前に閉じる。
      if (alreadyPlayed) {
        setPhase("done");
        return;
      }

      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // 保存できなくても演出自体は成立するため、失敗は無視する。
      }
      wroteMarkerRef.current = true;
    }

    // useReducedMotionの初期値は確定しないことがあるため、ここでは直接メディアクエリを参照する。
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    setStarted(true);

    timersRef.current = isReduced
      ? [setTimeout(() => setPhase("done"), 800)]
      : [
          setTimeout(() => setPhase("logoOut"), LOGO_OUT_AT_MS),
          setTimeout(() => setPhase("dissolve"), DISSOLVE_AT_MS),
          setTimeout(() => setPhase("done"), DONE_AT_MS),
        ];

    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_STANDARD }}
        >
          {/* 白幕。dissolveフェーズでopacityを落としつつ背面のblurを解く。 */}
          <div
            aria-hidden
            className={`intro-veil absolute inset-0 ${phase === "dissolve" ? "intro-veil--dissolve" : ""}`}
          />

          <motion.div
            className="relative flex w-full items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={
              !started
                ? { opacity: 0 }
                : phase === "logo" || reduced
                  ? { opacity: 1, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(5px)" }
            }
            transition={{ duration: LOGO_FADE_MS / 1000, ease: EASE_STANDARD }}
          >
            <LogoMark animated={started && !reduced} isStatic={started && reduced} />
          </motion.div>

          {started && !reduced && (
            <button
              type="button"
              onClick={finish}
              className="pointer-events-auto absolute right-6 bottom-6 text-[10px] tracking-[0.3em] text-[var(--color-ink-500)] uppercase transition-colors hover:text-[var(--color-ink-900)] md:right-10 md:bottom-10"
            >
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * NORBDENCEロゴの輪郭をstroke-dashoffsetで描いてから塗りを入れる。
 * 全パトを同時に描き始め、開始タイミング・所要時間・描き始める向きだけを
 * わずかにばらつかせることで、文字順ではなく「あちこちから同時に線が走る」見え方にする。
 */
function LogoMark({ animated, isStatic }: { animated: boolean; isStatic: boolean }) {
  const strokes = useMemo(
    () =>
      LOGO_PATHS.map((d, i) => {
        const delay = pseudoRandom(i * 7 + 11) * LOGO_DELAY_SPREAD_S;
        const duration = LOGO_DURATION_MIN_S + pseudoRandom(i * 13 + 29) * LOGO_DURATION_RANGE_S;
        return {
          d,
          delay,
          duration,
          // 半数程度は終点側から描き、描き始めの位置を散らす。
          reverse: pseudoRandom(i * 17 + 43) < 0.5,
        };
      }),
    [],
  );

  return (
    <svg viewBox={LOGO_VIEWBOX} className="w-[82vw] max-w-2xl" role="img" aria-label="NORBDENCE">
      {strokes.map(({ d, delay, duration, reverse }) => (
        <path
          key={d.slice(0, 12)}
          d={d}
          // pathLengthで字形の実長を1に正規化し、複雑さに関わらず同じ時間で描き切る。
          pathLength={1}
          className={`intro-logo-path ${
            animated ? (reverse ? "intro-logo-path--reverse" : "intro-logo-path--animated") : ""
          } ${isStatic ? "intro-logo-path--static" : ""}`}
          style={
            animated
              ? ({
                  "--intro-draw-delay": `${delay.toFixed(3)}s`,
                  "--intro-draw-duration": `${duration.toFixed(3)}s`,
                  // 塗りは全パス共通。輪郭が全て描き終わってから一斉に入る。
                  "--intro-fill-delay": `${FILL_DELAY_S.toFixed(3)}s`,
                  "--intro-fill-duration": `${FILL_DURATION_S.toFixed(3)}s`,
                } as React.CSSProperties)
              : undefined
          }
        />
      ))}
    </svg>
  );
}
