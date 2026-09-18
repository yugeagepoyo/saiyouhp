"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * active が true になったタイミングで 0 から target まで数字をカウントアップする。
 * prefers-reduced-motion では即座に最終値を表示する（duration:0 で animate 自体は通し、
 * setState は必ず animate の onUpdate コールバック内で行うことで
 * 「エフェクト内での同期的な setState」を避ける）。
 */
export function useCountUp(target: number, active: boolean, decimals = 0): string {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration: reduceMotion ? 0 : 1.2,
      ease: EASE_STANDARD,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [active, target, reduceMotion]);

  return display.toFixed(decimals);
}
