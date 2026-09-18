"use client";

import { motion } from "motion/react";
import type { DepartmentHoverEffect } from "@/data/departments";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * 部署ごとに特徴を反映した軽量なホバー演出（アイコン/背景線レベル）。
 * whileHover/whileFocus/whileTap で発火し、大きな装飾は行わない。
 */
export function DepartmentIcon({ effect }: { effect: DepartmentHoverEffect }) {
  switch (effect) {
    case "rising-numbers":
      return (
        <div className="flex h-8 items-end gap-1">
          {[0.4, 0.7, 1].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-[var(--color-accent-500)]"
              style={{ height: `${h * 100}%` }}
              variants={{ rest: { y: 0 }, hover: { y: -4 * (i + 1) } }}
              transition={{ duration: 0.35, ease: EASE_STANDARD, delay: i * 0.05 }}
            />
          ))}
        </div>
      );

    case "aligning-info":
      return (
        <div className="flex h-8 flex-col justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 rounded-full bg-[var(--color-accent-500)]"
              variants={{
                rest: { width: `${60 - i * 15}%`, x: i % 2 === 0 ? 0 : 8 },
                hover: { width: "80%", x: 0 },
              }}
              transition={{ duration: 0.35, ease: EASE_STANDARD, delay: i * 0.05 }}
            />
          ))}
        </div>
      );

    case "building-lines":
      return (
        <div className="flex h-8 items-end gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 origin-bottom rounded-sm bg-[var(--color-accent-500)]"
              style={{ height: "100%" }}
              variants={{ rest: { scaleY: 0.2 + i * 0.15 }, hover: { scaleY: 0.5 + i * 0.2 } }}
              transition={{ duration: 0.35, ease: EASE_STANDARD, delay: i * 0.06 }}
            />
          ))}
        </div>
      );

    case "deconstructing-blocks":
      return (
        <div className="grid h-8 w-8 grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-[var(--color-accent-500)]"
              variants={{
                rest: { x: 0, y: 0, rotate: 0 },
                hover: {
                  x: i % 2 === 0 ? -3 : 3,
                  y: i < 2 ? -3 : 3,
                  rotate: i % 2 === 0 ? -8 : 8,
                },
              }}
              transition={{ duration: 0.4, ease: EASE_STANDARD }}
            />
          ))}
        </div>
      );

    case "growing-graph":
      return (
        <svg viewBox="0 0 40 24" className="h-8 w-10" aria-hidden>
          <motion.polyline
            points="2,20 12,14 20,17 30,6 38,4"
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              rest: { pathLength: 0.5, opacity: 0.6 },
              hover: { pathLength: 1, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          />
        </svg>
      );

    case "converging-light": {
      const radius = 12;
      return (
        <div className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)]" />
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const left = 16 + radius * Math.cos(rad);
            const top = 16 + radius * Math.sin(rad);
            return (
              <motion.span
                key={angle}
                className="absolute h-1 w-1 rounded-full bg-[var(--color-accent-500)]"
                style={{ left, top }}
                variants={{
                  rest: { scale: 1, opacity: 0.6 },
                  hover: { scale: 0.2, opacity: 1, left: 16, top: 16 },
                }}
                transition={{ duration: 0.4, ease: EASE_STANDARD }}
              />
            );
          })}
        </div>
      );
    }

    default:
      return null;
  }
}
