/** 福利厚生・待遇。共有いただいた福利厚生資料の内容をそのまま反映している。 */

export interface BenefitListItem {
  label: string;
  /** 支給額・条件などの補足（複数行の場合は改行区切り） */
  detail?: string;
}

/**
 * 写真で大きく紹介する福利厚生。
 * images は1枚なら固定表示、2枚以上なら自動クロスフェードで切り替わる。
 * 写真を追加するときはこの配列へパスを足すだけでよい。
 * 素材が未着の項目は images を空のままにする（推測で別の写真を流用しないこと）。
 */
export interface BenefitImage {
  src: string;
  /** 円形に切り抜く際、被写体が切れないよう調整する表示位置（CSS object-position） */
  objectPosition?: string;
}

export interface FeaturedBenefit {
  id: string;
  label: string;
  imageLabel: string;
  images?: BenefitImage[];
}

export const featuredBenefits: FeaturedBenefit[] = [
  {
    id: "sweets",
    label: "お菓子食べ放題制度",
    imageLabel: "お菓子食べ放題制度の写真",
    // 縦長写真。お菓子の棚が入るよう下寄りで切り抜く。
    images: [{ src: "/images/benefits/sweets.jpg", objectPosition: "center 70%" }],
  },
  {
    id: "fitness",
    label: "リフレッシュ・フィットネス設備",
    imageLabel: "リフレッシュ・フィットネス設備の写真",
    images: [
      { src: "/images/benefits/fitness-1.jpg" },
      { src: "/images/benefits/fitness-2.jpg", objectPosition: "center 40%" },
    ],
  },
  {
    id: "booth",
    label: "集中ブース設置",
    imageLabel: "集中ブースの写真",
    images: [
      { src: "/images/benefits/booth-1.jpg" },
      // 「ROOM 2」のサインとドアが入るよう、やや上寄りで切り抜く。
      { src: "/images/benefits/booth-2.jpg", objectPosition: "center 30%" },
    ],
  },
  {
    id: "ladies",
    label: "女性専用休憩室",
    imageLabel: "女性専用休憩室の写真",
    // 縦に長い写真。ソファと窓が収まるよう下寄りで切り抜く。
    images: [{ src: "/images/benefits/ladies.jpg", objectPosition: "center 65%" }],
  },
];

/**
 * ■独自の福利厚生（文字のみで紹介する項目）
 * 写真で紹介する4項目（featuredBenefits）はこの一覧から外している。
 * 「集中ブース設置、女性専用休憩室」は1項目にまとまっていたため、写真側で2項目に分けた。
 */
export const uniqueBenefits: BenefitListItem[] = [
  { label: "社員旅行" },
  { label: "定例食事会、季節イベント（自由参加）" },
  { label: "常備薬購入補助" },
  { label: "部活動（野球部、ボーリング部）" },
  { label: "リファラル採用インセンティブ（紹介者・入社者双方）" },
  { label: "確定拠出年金（企業型DC）" },
  { label: "クリスマス賞与", detail: "業績によりクリスマスに支給\n自分にプレゼントを購入" },
  { label: "五感で楽しむオフィス空間" },
  { label: "会員制ゴルフ施設利用可能" },
  { label: "レンタカー制度" },
  { label: "オリジナルロゴノベルティ支給・貸与（ウェア、備品等）" },
];

/** ■待遇 */
export const treatmentBenefits: BenefitListItem[] = [
  {
    label: "通勤交通費支給",
    detail: "公共交通機関：通勤定期券費用30,000円まで支給\n自家用車：条件に合わせて支給有り",
  },
  {
    label: "営業交通費支給",
    detail: "公共交通機関：全額支給\n車両使用：ETCカード、レンタカーカード、ガソリンカード支給",
  },
  { label: "法人クレジットカード支給" },
  { label: "接待交際費経費制度" },
  { label: "社外研修・セミナー参加費補助" },
  { label: "資格取得支援（受験料・講座費用補助）" },
  { label: "ノートPC、社用携帯の支給" },
  { label: "健康診断" },
  { label: "退職金制度" },
  { label: "慶弔見舞金" },
];
