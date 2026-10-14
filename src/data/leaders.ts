/**
 * 代表・部門長メッセージに掲載するメンバー。
 *
 * 氏名・読みは共有いただいたもののみを記載する。
 * ローマ字は共有済みの読みから起こしており、読みが未共有の箇所は姓のみにしている。
 * 写真も共有済みのものだけを割り当て、未着の方は推測で別の写真を当てず
 * プレースホルダー（label のみ）を表示する。
 *
 * 代表・部門長はインタビュー記事を持たないため、カードからのリンクはない。
 */

export interface Leader {
  id: string;
  /** 役職（表示順はこの配列の並び） */
  role: string;
  name: string;
  /** 氏名のローマ字表記。読みが未共有の場合は姓のみ。 */
  nameEn: string;
  photoSrc?: string;
  photoLabel: string;
}

/** 代表はセクション最上段に大きく掲載するため、メッセージ本文を持つ。 */
export interface CeoLeader extends Leader {
  /** 代表メッセージ本文（段落ごとに1要素）。共有いただいた文面をそのまま掲載する。 */
  message: string[];
  /** 自筆署名の画像 */
  signatureSrc?: string;
}

export const ceo: CeoLeader = {
  id: "ceo",
  role: "代表取締役",
  name: "山住 広大",
  nameEn: "Yamazumi Kodai",
  photoSrc: "/images/people/ceo.jpg",
  photoLabel: "代表取締役の写真",
  // 共有いただいた代表メッセージ。文面は変更しない。
  message: [
    "会社経営は、経営者が一人でできることは限りがあります。従業員一人ひとりの力が合わさることで、大きな力となって社会に貢献していけるものだと考えています。",
    "当社は「従業員が主役」の会社です。",
    "経営者として意識していることは、従業員とそのご家族が会社を通じて「永続的な幸福」を実現できる場を提供することだと考えています。",
    "従業員の「幸福の実現」に向けて、社会人としての人生をかけて取り組んでいく所存です。",
  ],
  signatureSrc: "/images/people/ceo-signature.png",
};

export const departmentLeaders: Leader[] = [
  {
    id: "sales-1",
    role: "第一営業部 部長",
    name: "安部 真成",
    nameEn: "Abe Masanari",
    photoSrc: "/images/people/sales-1-manager.jpg",
    photoLabel: "第一営業部 部長の写真",
  },
  {
    id: "sales-2",
    role: "第二営業部 部長",
    name: "大塚 力哉",
    nameEn: "Otsuka Rikiya",
    photoSrc: "/images/people/sales-2-manager.jpg",
    photoLabel: "第二営業部 部長の写真",
  },
  {
    id: "construction",
    role: "建設事業部 部長",
    name: "山住 豪志",
    nameEn: "Yamazumi Tsuyoshi",
    photoSrc: "/images/people/construction-manager.jpg",
    photoLabel: "建設事業部 部長の写真",
  },
  {
    id: "demolition",
    role: "解体施工部 部長",
    name: "石井 克樹",
    nameEn: "Ishii Katsuki",
    photoLabel: "解体施工部 部長の写真（未着）",
  },
  {
    id: "finance-admin",
    role: "財務戦略部・管理部 部長",
    name: "立石 裕也",
    nameEn: "Tateishi Yuya",
    photoLabel: "財務戦略部・管理部 部長の写真（未着）",
  },
];
