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
  /** 連携している地域（市区名など） */
  areas?: string[];
  imageLabel: string;
  imageSrc?: string;
  /** 横長表示で重要部分が切れないよう調整する表示位置（CSS object-position） */
  imagePosition?: string;
}

export const communityActivities: CommunityActivity[] = [
  {
    id: "event",
    title: "地域イベントへの参加",
    description:
      "地域のお祭りや清掃活動など、地元に根差したイベントに参加し、地域とのつながりを大切にしています。",
    imageLabel: "地域イベント写真",
    imageSrc: "/images/community/event.jpg",
  },
  {
    id: "sports",
    title: "兵庫県 企業版ふるさと納税",
    description:
      "兵庫県の地域活性化プロジェクトへの寄附を通じて、子どもたちがプロスポーツに触れる機会の創出を支援しています。",
    imageLabel: "スポーツ支援写真",
    imageSrc: "/images/community/sports.jpg",
  },
  {
    id: "donation",
    title: "寄附・地域貢献",
    description: "地域の福祉活動や災害支援などへの寄附を通じて、社会への還元を継続的に行っています。",
    imageLabel: "寄附・地域貢献写真",
    imageSrc: "/images/community/donation.jpg",
  },
  {
    id: "facility",
    title: "福島区民センター ネーミングライツ取得",
    description: "地域の施設・団体と連携し、不動産・建設の知見を活かした協力を行っています。",
    imageLabel: "地域施設との連携写真",
    imageSrc: "/images/community/facility.jpg",
  },
];
