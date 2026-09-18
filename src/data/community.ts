/**
 * 地域や社会への還元（活動紹介）データ。
 * 写真は仮画像（imageLabelのみ）。実写真が用意でき次第、imageSrcにパスを追加すれば
 * コンポーネント側は自動的に実写真を表示する構造にしている。
 */

export interface CommunityStat {
  label: string;
  value?: number;
  unit?: string;
  precision?: number;
  /** value が未確定の場合の仮表記（例: "XX件"） */
  placeholderText?: string;
}

export interface CommunityActivity {
  id: string;
  title: string;
  description: string;
  stat?: CommunityStat;
  link?: { href: string; label: string };
  imageLabel: string;
  imageSrc?: string;
}

export const communityActivities: CommunityActivity[] = [
  {
    id: "event",
    title: "地域イベントへの参加",
    description:
      "地域のお祭りや清掃活動など、地元に根差したイベントに参加し、地域とのつながりを大切にしています。",
    imageLabel: "地域イベント写真（仮）",
  },
  {
    id: "sports",
    title: "スポーツ支援",
    description: "地域のスポーツ団体・大会を支援し、子どもたちが安心して打ち込める環境づくりに協力しています。",
    imageLabel: "スポーツ支援写真（仮）",
  },
  {
    id: "donation",
    title: "寄附・地域貢献",
    description: "地域の福祉活動や災害支援などへの寄附を通じて、社会への還元を継続的に行っています。",
    stat: { label: "寄附・協賛実績", placeholderText: "XX件" },
    imageLabel: "寄附・地域貢献写真（仮）",
  },
  {
    id: "facility",
    title: "地域施設との取り組み",
    description: "地域の施設・団体と連携し、不動産・建設の知見を活かした協力を行っています。",
    imageLabel: "地域施設との取り組み写真（仮）",
  },
  {
    id: "other",
    title: "その他社会貢献活動",
    description: "本業である不動産・建設・解体産廃の知見を通じて、社会に貢献できる取り組みを模索しています。",
    imageLabel: "社会貢献活動写真（仮）",
  },
];
