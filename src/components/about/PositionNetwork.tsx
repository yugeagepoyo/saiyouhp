"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * 「業界でのポジションや強み」の相関図。
 *
 * 伝えたいこと: 不動産・建設・解体を自社内でつないでいるため、周囲の会社と競合せず、
 * 取引業者・協力会社として双方向に仕事をつなげられる。
 *
 * 通常時は中央・3事業・6者・ごく薄い接続線だけを見せ、
 * hover / focus / tap した相手との関係だけを強調する。
 * PCはSVG1枚で完結させ（文字もSVG内に置くため横幅によらず比率が崩れない）、
 * スマートフォンは中央を上、6者を2列に積むレイアウトへ切り替える。
 */

const INK = "var(--color-ink-900)";
const INK_700 = "var(--color-ink-700)";
const INK_300 = "var(--color-ink-300)";
const GRAY = "var(--color-ink-500)";
const RED = "var(--color-accent-600)";
const PAPER = "var(--color-paper-050)";

type IconName = "house" | "building" | "carpenter" | "trader" | "demolition";
type Side = "left" | "right";

interface Partner {
  id: string;
  name: string;
  icon: IconName;
  side: Side;
  row: 0 | 1 | 2;
  /** NORBDENCE → 相手 */
  outbound: string;
  /** 相手 → NORBDENCE */
  inbound: string;
}

const partners: Partner[] = [
  {
    id: "reform-b",
    name: "リフォーム会社B",
    icon: "house",
    side: "left",
    row: 0,
    outbound: "廃材回収",
    inbound: "廃材回収依頼",
  },
  {
    id: "realestate-b",
    name: "不動産会社B",
    icon: "building",
    side: "left",
    row: 1,
    outbound: "リフォーム",
    inbound: "リフォーム案件紹介",
  },
  {
    id: "carpenter-a",
    name: "大工さんA",
    icon: "carpenter",
    side: "left",
    row: 2,
    outbound: "自社買取",
    inbound: "相続相談",
  },
  {
    id: "realestate-a",
    name: "不動産会社A",
    icon: "building",
    side: "right",
    row: 0,
    outbound: "買取再販",
    inbound: "買取相談",
  },
  {
    id: "trader-a",
    name: "商社担当者A",
    icon: "trader",
    side: "right",
    row: 1,
    outbound: "売却仲介",
    inbound: "売却相談",
  },
  {
    id: "demolition-a",
    name: "解体担当者",
    icon: "demolition",
    side: "right",
    row: 2,
    outbound: "売却・購入仲介",
    inbound: "住み替え相談",
  },
];

/* ---------------------------------------------------------------- 図形の座標 */

const VB_W = 1400;
const VB_H = 700;
/** 中央プレート（CenterPlate はローカル座標 0-360 で描く） */
const PLATE = { x: 520, y: 170, size: 360 };
const ROW_Y = [130, 350, 570] as const;
const NODE_X: Record<Side, number> = { left: 130, right: 1270 };
/** 接続線がノード手前で止まる位置 */
const LINE_END: Record<Side, number> = { left: 250, right: 1150 };
const ANCHOR_X: Record<Side, number> = { left: PLATE.x, right: PLATE.x + PLATE.size };
const ANCHOR_Y = [250, 350, 450] as const;
/** 往路・復路を見分けるための垂直オフセット */
const LANE = 7;
/** 取引内容の文字を線からどれだけ離すか */
const LABEL_GAP = 96;

/**
 * 接続線の中点と、そこでの法線（常に画面上方向）。
 * 取引内容の文字は、この法線にそって線の上側・下側へ振り分けて置く。
 * 曲線の傾きに合わせて逃がすため、斜めの行でも線に重ならない。
 */
function labelAnchors(side: Side, row: 0 | 1 | 2) {
  const ax = ANCHOR_X[side];
  const ay = ANCHOR_Y[row];
  const ex = LINE_END[side];
  const ey = ROW_Y[row];
  const dx = ex - ax;
  const c1x = ax + dx * 0.45;
  const c2x = ax + dx * 0.55;
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: u * u * u * ax + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * ex,
      y: u * u * u * ay + 3 * u * u * t * ay + 3 * u * t * t * ey + t * t * t * ey,
    };
  };
  const mid = at(0.5);
  const a = at(0.44);
  const b = at(0.56);
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  let nx = -(b.y - a.y) / len;
  let ny = (b.x - a.x) / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  return {
    out: { x: mid.x + nx * LABEL_GAP, y: mid.y + ny * LABEL_GAP },
    inb: { x: mid.x - nx * LABEL_GAP, y: mid.y - ny * LABEL_GAP },
  };
}

function connector(side: Side, row: 0 | 1 | 2, offset = 0, reverse = false) {
  const ax = ANCHOR_X[side];
  const ay = ANCHOR_Y[row] + offset;
  const ex = LINE_END[side];
  const ey = ROW_Y[row] + offset;
  const dx = ex - ax;
  const c1x = ax + dx * 0.45;
  const c2x = ax + dx * 0.55;
  return reverse
    ? `M ${ex} ${ey} C ${c2x} ${ey}, ${c1x} ${ay}, ${ax} ${ay}`
    : `M ${ax} ${ay} C ${c1x} ${ay}, ${c2x} ${ey}, ${ex} ${ey}`;
}

/* ------------------------------------------------------------------ アイコン */

/** 線画アイコンの中身（svg要素は呼び出し側が用意する）。1点だけ赤を使う。 */
function PartnerIcon({ name }: { name: IconName }) {
  switch (name) {
    case "house":
      return (
        <>
          <path d="M4.5 15.5 16 6l11.5 9.5" stroke={INK} />
          <path d="M8 14.5V26.5h16V14.5" stroke={INK} />
          <path d="M10.5 18h3.5v3.5h-3.5z" stroke={GRAY} />
          <path d="M18 26.5V19h4.5v7.5" stroke={RED} />
        </>
      );
    case "building":
      return (
        <>
          <path d="M4.5 26.5h23" stroke={INK} />
          <path d="M8.5 26.5V8h15v18.5" stroke={INK} />
          <path d="M11.5 12h3M17.5 12h3M11.5 16.5h3M17.5 16.5h3M11.5 21h3M17.5 21h3" stroke={GRAY} />
          <path d="M12 8V5h8v3" stroke={RED} />
        </>
      );
    case "carpenter":
      return (
        <>
          <path d="M7 26.5c0-4.3 4-6.6 9-6.6s9 2.3 9 6.6" stroke={INK} />
          <path d="M12 13v2a4 4 0 0 0 8 0v-2" stroke={INK} />
          <path d="M11 13a5 5 0 0 1 10 0" stroke={RED} />
          <path d="M8.5 13h15" stroke={RED} />
        </>
      );
    case "trader":
      return (
        <>
          <circle cx="16" cy="10" r="4" stroke={INK} />
          <path d="M7 26.5c0-4.3 4-6.6 9-6.6s9 2.3 9 6.6" stroke={INK} />
          <path d="M13 20.2 16 22.5l3-2.3" stroke={INK} />
          <path d="M14.6 22.5h2.8l-1.4 5z" stroke={RED} />
        </>
      );
    case "demolition":
      return (
        <>
          <path d="M4.5 26.5h23" stroke={INK} />
          <path d="M8 26.5V12.5l4-2 4 2 4-2v16" stroke={INK} />
          <path d="M11 17h3.5M11 21.5h3.5" stroke={GRAY} />
          <path d="M23 22.5h4.5v4h-4.5z" stroke={RED} />
          <path d="m25.5 13 2 2-2 2-2-2z" stroke={RED} />
        </>
      );
  }
}

/* ------------------------------------------------------------- 中央プレート */

/**
 * NORBDENCEの中央部。ローカル座標 0-360 の正方形。
 * 不動産・建設・解体を細い円のVenn構成で重ね、3つが重なる核に赤を1点だけ置く。
 */
function CenterPlate({ revealed, reduceMotion }: { revealed: boolean; reduceMotion: boolean }) {
  const dur = (s: number) => (reduceMotion ? 0 : s);
  const rings: { cx: number; cy: number; label: string; lx: number; ly: number }[] = [
    { cx: 180, cy: 182, label: "不動産", lx: 180, ly: 146 },
    { cx: 136, cy: 258, label: "建設", lx: 126, ly: 290 },
    { cx: 224, cy: 258, label: "解体", lx: 234, ly: 290 },
  ];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.94 }}
      animate={revealed ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: dur(0.7), ease: EASE_STANDARD }}
      style={{ transformOrigin: "180px 180px" }}
    >
      <rect x="0" y="0" width="360" height="360" rx="10" fill={INK} />
      <rect x="14" y="14" width="332" height="332" rx="6" fill="none" stroke={PAPER} strokeOpacity="0.16" />

      <motion.g
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : undefined}
        transition={{ duration: dur(0.6), delay: dur(0.2), ease: EASE_STANDARD }}
      >
        <text
          x="180"
          y="74"
          textAnchor="middle"
          fontSize="33"
          letterSpacing="1.5"
          fill={PAPER}
          style={{ fontFamily: "var(--font-logo)" }}
        >
          NORBDENCE
        </text>
        <path d="M150 92h60" stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {rings.map((r, i) => (
        <motion.circle
          key={r.label}
          cx={r.cx}
          cy={r.cy}
          r="72"
          fill={PAPER}
          fillOpacity="0.07"
          stroke={PAPER}
          strokeOpacity="0.55"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={revealed ? { pathLength: 1 } : undefined}
          transition={{ duration: dur(0.9), delay: dur(0.45 + i * 0.18), ease: EASE_STANDARD }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : undefined}
        transition={{ duration: dur(0.5), delay: dur(1.05), ease: EASE_STANDARD }}
      >
        {rings.map((r) => (
          <text key={r.label} x={r.lx} y={r.ly} textAnchor="middle" fontSize="21" fill={PAPER}>
            {r.label}
          </text>
        ))}
        <circle cx="180" cy="233" r="4.5" fill={RED} />
      </motion.g>
    </motion.g>
  );
}

/* -------------------------------------------------------------------- 本体 */

export function PositionNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion() ?? false;
  const revealed = inView || reduceMotion;

  // マウスはhover、タッチはtapで選択する。
  // pointerType で振り分けることで、タップ時に hover と click が二重に効くのを防ぐ。
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = pinnedId ?? hoverId;

  const dur = (s: number) => (reduceMotion ? 0 : s);

  function toggle(id: string) {
    setPinnedId((prev) => (prev === id ? null : id));
  }

  return (
    <div ref={containerRef} className="mt-12">
      {/* 図を読めない環境向けの説明。表示は図と重複するため隠す。 */}
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.id}>
            {`NORBDENCEから${p.name}へ：${p.outbound}。${p.name}からNORBDENCEへ：${p.inbound}。`}
          </li>
        ))}
      </ul>

      {/* ------------------------------------------------------------ PC */}
      <div className="hidden md:block">
        {/* 取引内容の文字はSVG外（HTML）に重ねる。SVG内の文字は画面幅に比例して
            縮んでしまい、小さめのデスクトップで読めなくなるため。 */}
        <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="NORBDENCEと取引先の相関図"
        >
          <defs>
            {/* 線の終端に置く矢印。orient="auto" でパスの進行方向を向く。 */}
            <marker
              id="pn-arrow-red"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10z" fill={RED} />
            </marker>
            <marker
              id="pn-arrow-ink"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10z" fill={INK_700} />
            </marker>
          </defs>
          {/* 接続線（通常時はごく薄く） */}
          {partners.map((p, i) => {
            const isActive = activeId === p.id;
            const isDimmed = activeId !== null && !isActive;
            return (
              <motion.g
                key={`line-${p.id}`}
                animate={{ opacity: isDimmed ? 0.15 : 1 }}
                transition={{ duration: dur(0.3), ease: EASE_STANDARD }}
              >
                <motion.path
                  d={connector(p.side, p.row)}
                  fill="none"
                  stroke={INK_300}
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={revealed ? { pathLength: 1 } : undefined}
                  transition={{ duration: dur(0.7), delay: dur(1.6 + i * 0.08), ease: EASE_STANDARD }}
                />

                {/* 選択中だけ、往復2本を色分けして重ねる。
                    線の終端に矢印を置き、さらに小さな矢印が
                    その向きのまま線上を移動する。 */}
                <AnimatePresence>
                  {isActive && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE_STANDARD }}
                    >
                      <path
                        d={connector(p.side, p.row, -LANE)}
                        fill="none"
                        stroke={RED}
                        strokeWidth="1.8"
                        strokeOpacity="0.85"
                        markerEnd="url(#pn-arrow-red)"
                      />
                      <path
                        className="diagram-arrow"
                        d="M-7-4.5 7 0-7 4.5z"
                        fill={RED}
                        style={{ offsetPath: `path("${connector(p.side, p.row, -LANE)}")` }}
                      />
                      <path
                        d={connector(p.side, p.row, LANE, true)}
                        fill="none"
                        stroke={INK_700}
                        strokeWidth="1.8"
                        strokeOpacity="0.6"
                        markerEnd="url(#pn-arrow-ink)"
                      />
                      <path
                        className="diagram-arrow"
                        d="M-7-4.5 7 0-7 4.5z"
                        fill={INK_700}
                        style={{ offsetPath: `path("${connector(p.side, p.row, LANE, true)}")` }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.g>
            );
          })}

          <g transform={`translate(${PLATE.x} ${PLATE.y})`}>
            <CenterPlate revealed={revealed} reduceMotion={reduceMotion} />
          </g>

          {/* 6者 */}
          {partners.map((p, i) => {
            const nx = NODE_X[p.side];
            const ny = ROW_Y[p.row];
            const isActive = activeId === p.id;
            const isDimmed = activeId !== null && !isActive;
            return (
              <motion.g
                key={p.id}
                initial={{ opacity: 0, x: p.side === "left" ? -34 : 34 }}
                animate={revealed ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: dur(0.6), delay: dur(1.15 + i * 0.09), ease: EASE_STANDARD }}
              >
                <motion.g
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.name}との取引内容を表示`}
                  aria-pressed={isActive}
                  className="cursor-pointer outline-none"
                  animate={{ opacity: isDimmed ? 0.25 : 1 }}
                  transition={{ duration: dur(0.3), ease: EASE_STANDARD }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setHoverId(p.id);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setHoverId((prev) => (prev === p.id ? null : prev));
                  }}
                  onFocus={() => setHoverId(p.id)}
                  onBlur={() => setHoverId((prev) => (prev === p.id ? null : prev))}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(p.id);
                    }
                  }}
                >
                  <rect x={nx - 110} y={ny - 66} width="220" height="106" rx="10" fill="transparent" />
                  <motion.rect
                    x={nx - 110}
                    y={ny - 66}
                    width="220"
                    height="106"
                    rx="10"
                    fill="none"
                    stroke={RED}
                    animate={{ opacity: isActive ? 0.45 : 0 }}
                    transition={{ duration: dur(0.25), ease: EASE_STANDARD }}
                  />
                  <g
                    transform={`translate(${nx - 24} ${ny - 54}) scale(1.5)`}
                    fill="none"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <PartnerIcon name={p.icon} />
                  </g>
                  <text x={nx} y={ny + 29} textAnchor="middle" fontSize="26" fontWeight="500" fill={INK}>
                    {p.name}
                  </text>
                </motion.g>
              </motion.g>
            );
          })}

        </svg>

          {/* 取引内容。線の上側に赤（NORBDENCE→相手）、下側にグレー（相手→NORBDENCE）を
              振り分けて置く。線や矢印の上には重ねない。 */}
          <AnimatePresence>
            {partners
              .filter((p) => p.id === activeId)
              .map((p) => {
                const anchors = labelAnchors(p.side, p.row);
                const align = p.side === "left" ? "text-right" : "text-left";
                return (
                  <motion.div
                    key={`label-${p.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_STANDARD }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${align}`}
                      style={{
                        left: `${(anchors.out.x / VB_W) * 100}%`,
                        top: `${(anchors.out.y / VB_H) * 100}%`,
                      }}
                    >
                      <p className="text-[10px] leading-tight text-[var(--color-accent-600)] opacity-70">
                        {"NORBDENCE →"}
                      </p>
                      <p className="text-xs leading-tight font-medium text-[var(--color-accent-600)]">
                        {p.outbound}
                      </p>
                    </div>

                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${align}`}
                      style={{
                        left: `${(anchors.inb.x / VB_W) * 100}%`,
                        top: `${(anchors.inb.y / VB_H) * 100}%`,
                      }}
                    >
                      <p className="text-[10px] leading-tight text-[var(--color-ink-500)]">
                        {"→ NORBDENCE"}
                      </p>
                      <p className="text-xs leading-tight font-medium text-[var(--color-ink-900)]">
                        {p.inbound}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {/* -------------------------------------------------- スマートフォン */}
      <div className="md:hidden">
        <svg viewBox="0 0 360 360" className="mx-auto h-auto w-60" aria-hidden>
          <CenterPlate revealed={revealed} reduceMotion={reduceMotion} />
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {partners.map((p) => {
            const isActive = activeId === p.id;
            const isDimmed = activeId !== null && !isActive;
            return (
              <button
                key={p.id}
                type="button"
                aria-expanded={isActive}
                onClick={() => toggle(p.id)}
                className={`rounded-xl border bg-[var(--color-paper-050)] px-3 py-4 text-center transition-opacity duration-300 ${
                  isDimmed ? "opacity-25" : "opacity-100"
                } ${isActive ? "border-[var(--color-accent-500)]" : "border-[var(--color-paper-200)]"}`}
              >
                <svg
                  viewBox="0 0 32 32"
                  className="mx-auto h-9 w-9"
                  fill="none"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <PartnerIcon name={p.icon} />
                </svg>
                <p className="mt-2 text-xs font-medium text-[var(--color-ink-900)]">{p.name}</p>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_STANDARD }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 border-t border-[var(--color-paper-200)] pt-3 text-left">
                        <div>
                          <p className="text-[10px] text-[var(--color-accent-600)] opacity-75">NORBDENCE →</p>
                          <p className="text-xs font-medium text-[var(--color-accent-600)]">{p.outbound}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[var(--color-ink-500)]">{`${p.name} →`}</p>
                          <p className="text-xs font-medium text-[var(--color-ink-900)]">{p.inbound}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* 操作の案内（上段）と線の凡例（下段）の二段 */}
      <div className="mt-8 text-xs text-[var(--color-ink-500)]">
        <p className="text-center">
          <span className="hidden md:inline">会社・担当者にカーソルを合わせると取引内容を表示します</span>
          <span className="md:hidden">会社・担当者をタップすると取引内容を表示します</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--color-accent-600)]" />
            NORBDENCE → お取引先
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--color-ink-700)]" />
            お取引先 → NORBDENCE
          </span>
        </div>
      </div>
    </div>
  );
}
