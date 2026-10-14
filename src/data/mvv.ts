/**
 * Mission / Vision / Value。
 * 文言はすべて会社から共有済みの確定内容。
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
}

export interface ValuePillar {
  id: string;
  title: string;
  body: string;
}

/** MVV全体の導入コピー */
export const mvvLead = "ノーブデンスが、日々大切にする考え方";

export const mvvBlocks: MvvBlock[] = [
  {
    id: "mission",
    eyebrow: "Mission",
    label: "使命",
    statement: "従業員の永続的な幸福を第一に考え、社会に反映していく",
    body: "もっとも身近な従業員とそのご家族の永続的な幸福を、企業活動を通じて実現します。従業員一人ひとりが幸せに満ちた状態で働き、不動産・建設業を通じて、地域社会およびすべてのステークホルダーに幸福を広げてまいります。",
  },
  {
    id: "vision",
    eyebrow: "Vision",
    label: "目指す姿",
    statement: "すべてに品格を、信頼の先の信用へ",
    body: "ノーブデンスは、すべての企業活動において品格を大切にし、誠実な姿勢で取り組むことで、お客様から真の信頼（信用）をいただける企業を目指してまいります。",
  },
  {
    id: "value",
    eyebrow: "Value",
    label: "価値観",
    statement: "努力が人を成長させ、成長が強さを生み、強さが真のカッコよさをつくる",
  },
];

/** Value を構成する3つの柱。 */
export const valuePillars: ValuePillar[] = [
  { id: "kensan", title: "研鑽", body: "個人、組織単位で成長を追求し、日々自己研鑽に努める" },
  {
    id: "henkaku",
    title: "変革",
    body: "時代の変化を的確に捉えつつ、真に価値あるものを継承し、変化に挑戦する組織を築く",
  },
  {
    id: "seicho",
    title: "成長",
    body: "短期間で大飛躍を目指すのではなく、日々の小さな成長を意識し、長期目線で大きく伸ばす",
  },
];
