/** 福利厚生・待遇。共有いただいた福利厚生資料の内容をそのまま反映している。 */

export interface BenefitListItem {
  label: string;
  /** 支給額・条件などの補足（複数行の場合は改行区切り） */
  detail?: string;
}

/** ■独自の福利厚生 */
export const uniqueBenefits: BenefitListItem[] = [
  { label: "社員旅行" },
  { label: "定例食事会、季節イベント（自由参加）" },
  { label: "常備薬購入補助" },
  { label: "集中ブース設置、女性専用休憩室" },
  { label: "部活動（野球部、ボーリング部）" },
  { label: "リファラル採用インセンティブ（紹介者・入社者双方）" },
  { label: "確定拠出年金（企業型DC）" },
  { label: "クリスマス賞与", detail: "2025年実績：80,000円支給" },
  { label: "五感で楽しむオフィス空間" },
  { label: "会員制ゴルフ施設利用可能" },
  { label: "リフレッシュ・フィットネス設備" },
  { label: "レンタカー制度" },
  { label: "オリジナルロゴノベルティ支給・貸与（ウェア、備品等）" },
  { label: "お菓子食べ放題制度" },
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
