import { companyOverview } from "./company";

/**
 * Mission / Vision / Value。
 *
 * status: "confirmed" は会社から共有済みの確定文言。
 * status: "pending" は正式な本文が未共有のため、実際の文章のように見えるダミーは置かず、
 * 確認中である旨のみを表示する。本番公開前に "pending" を grep し、確定文言へ差し替えること。
 */
export interface MvvBlock {
  id: string;
  /** 見出し（英字） */
  eyebrow: string;
  /** 日本語の小見出し */
  label: string;
  /** 主となる一文 */
  statement: string;
  body?: string;
  status: "confirmed" | "pending";
}

export interface ValuePillar {
  id: string;
  title: string;
  body?: string;
  status: "confirmed" | "pending";
}

export const mvvBlocks: MvvBlock[] = [
  {
    id: "mission",
    eyebrow: "Mission",
    label: "使命",
    statement: "従業員の永続的な幸福のために考え、社会に反映していく",
    // 経営理念として共有済みの本文を使用（同一の理念を指すため）
    body: companyOverview.management.body,
    status: "confirmed",
  },
  {
    id: "vision",
    eyebrow: "Vision",
    label: "目指す姿",
    statement: "すべてに品格を、信頼の先の信用へ",
    // 企業理念として共有済みの本文を使用（同一の理念を指すため）
    body: companyOverview.philosophy.body,
    status: "confirmed",
  },
  {
    id: "value",
    eyebrow: "Value",
    label: "価値観",
    statement: "人、組織が研鑽を重ね、挑戦し、持続的な成長を実現する",
    status: "pending",
  },
];

/** Value を構成する3つの柱。各説明文は正式な文言の共有待ち。 */
export const valuePillars: ValuePillar[] = [
  { id: "kensan", title: "研鑽", status: "pending" },
  { id: "henkaku", title: "変革", status: "pending" },
  { id: "seicho", title: "成長", status: "pending" },
];
