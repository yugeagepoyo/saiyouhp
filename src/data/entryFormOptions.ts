/** エントリーフォームの選択肢。時間区分等は運用しながら調整しやすいよう、ここに集約している。 */

export interface SelectOption {
  value: string;
  label: string;
}

export const genderOptions: SelectOption[] = [
  { value: "female", label: "女性" },
  { value: "male", label: "男性" },
  { value: "other", label: "その他" },
  { value: "unspecified", label: "未選択" },
];

export const contactTimeOptions: SelectOption[] = [
  { value: "morning", label: "午前" },
  { value: "12-15", label: "12:00〜15:00" },
  { value: "15-18", label: "15:00〜18:00" },
  { value: "after18", label: "18:00以降" },
  { value: "anytime", label: "いつでも可能" },
];

/** 「いつでも可能」と排他的に扱う値。 */
export const CONTACT_TIME_ANYTIME_VALUE = "anytime";

export const experienceOptions: SelectOption[] = [
  { value: "experienced", label: "経験あり" },
  { value: "inexperienced", label: "未経験" },
];
