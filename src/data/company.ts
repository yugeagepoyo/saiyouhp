/**
 * 会社数値データ。
 *
 * status: "confirmed" の項目のみ実数値を表示する。
 * status: "placeholder" の項目は、本人から共有された数値が未確定のため
 * 「XX%」「000件」のような仮表記のみを表示し、実数のように見えるダミー値は作らない。
 *
 * 本番公開前チェック: `status: "placeholder"` を grep し、
 * 実数が確定した項目から順に "confirmed" へ変更・実値を入力すること。
 */

export type StatDisplayType = "counter" | "pie" | "flip" | "bar";

export interface CompanyStat {
  id: string;
  label: string;
  status: "confirmed" | "placeholder";
  display: StatDisplayType;
  /** confirmed の場合のみ使用する実数値 */
  value?: number;
  /** 表示する小数桁数（未指定時は整数なら0、小数なら1桁） */
  precision?: number;
  unit?: string;
  /** placeholder の場合に表示する仮表記（例: "XX%"） */
  placeholderText?: string;
  note?: string;
  /**
   * 項目イラスト（public/images/numbers/illust/ 配下）。
   * 元画像には項目名の文字が入っているため、イラスト部分だけを切り出した illust/ を参照する
   * （項目名はカード上部にテキストとして別途表示する）。
   * 1項目1ファイルで独立しているため、差し替えは同名PNGを上書きするだけでよい。
   */
  icon?: string;
  /** 項目ごとに表示幅を変えたい場合のTailwindクラス（未指定時は共通の既定値）。 */
  iconWidthClass?: string;
}

export const companyStats: CompanyStat[] = [
  {
    id: "average-age",
    label: "平均年齢",
    status: "confirmed",
    display: "counter",
    value: 29.07,
    unit: "歳",
    icon: "/images/numbers/illust/average-age.png",
  },
  {
    id: "parental-leave-return-rate",
    label: "産休・育休 復帰後定着率",
    status: "confirmed",
    display: "pie",
    value: 100,
    unit: "%",
    note: "2025年実績",
    icon: "/images/numbers/illust/parental-return.png",
  },
  {
    id: "male-parental-leave-rate",
    label: "男性育休取得率",
    status: "confirmed",
    display: "pie",
    value: 100,
    unit: "%",
    note: "2025年実績",
    icon: "/images/numbers/illust/male-parental-leave.png",
  },
  {
    id: "paid-leave-days",
    label: "有給休暇 平均取得日数",
    status: "confirmed",
    display: "flip",
    value: 4.0,
    precision: 1,
    unit: "日",
    note: "2025年実績",
    icon: "/images/numbers/illust/paid-leave.png",
  },
  {
    id: "retention-rate",
    label: "定着率",
    status: "confirmed",
    display: "bar",
    value: 91.5,
    precision: 1,
    unit: "%",
    note: "過去5年間の社員定着率",
  },
  {
    id: "revenue-growth",
    label: "売上成長",
    status: "confirmed",
    display: "counter",
    value: 35,
    unit: "倍",
    note: "5年間で売上1億円→35億円に成長",
    icon: "/images/numbers/illust/sales-growth.png",
  },
];

export const companyOverview = {
  name: "株式会社ノーブデンス",
  philosophy: {
    title: "企業理念",
    catchphrase: "すべてに品格を、信頼の先の信用へ",
    body: "仕事で信用を得るのは、容易なことではないと思っています。あらゆるアクションに品格を宿し、関わるすべての方々からの信頼を礎に、揺るぎない信用を積み重ねてまいります。",
  },
  management: {
    title: "経営理念",
    catchphrase: "社員の永続的な幸福のために運営し社会に反映していく",
    body: "働く一人ひとりが心身共に満たされ、やりがいと成長を実感できる環境を整えることこそが、企業の持続的発展の原動力であると考えています。そして、その幸福に満ちた従業員一人ひとりが、お客様に対してより高い価値と誠実なサービスを提供し、さらには地域社会へとその価値を広げていくことで、幸福の好循環が生まれていくと信じています。当社は、この「幸福の連鎖」を大切にしながら、企業活動を通じて関わるすべての人々に良い影響を与え、社会全体へと幸福を拡散していける存在となることを目指し、これからも努力を重ねてまいります。",
  },
  /** 会社概要の基本情報。資本金のみ未確認のため、確定次第入力する。 */
  overviewTable: [
    { label: "会社名", value: "株式会社ノーブデンス（NORBDENCE Inc.）", status: "confirmed" as const },
    {
      label: "所在地",
      value:
        "【大阪オフィス】〒531-0072　大阪市北区豊崎3丁目20番10号\n" +
        "【東京オフィス】〒103-0027　東京都中央区日本橋3丁目6番11号6階\n" +
        "【兵庫オフィス】〒661-0961　兵庫県尼崎市戸ノ内町4丁目3番1号3棟109",
      status: "confirmed" as const,
    },
    { label: "創業", value: "令和3年2月", status: "confirmed" as const },
    { label: "代表者", value: "代表取締役　山住 広大", status: "confirmed" as const },
    { label: "従業員数", value: "32名（平均年齢29歳）", status: "confirmed" as const },
    { label: "資本金", value: "確認中", status: "placeholder" as const },
    {
      label: "事業内容",
      value: "不動産事業・建設事業・解体産廃事業 ほか",
      status: "placeholder" as const,
    },
  ],
};
