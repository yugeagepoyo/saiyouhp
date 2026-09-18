/**
 * 部署別の数値データ。TOPページの「数字で見るノーブデンス」は会社全体の数値のみを扱うため、
 * ここでの数値は今後実装する /about（働きやすさに関するデータ）や
 * /work の部署詳細パネル、募集職種詳細ページ等で使用する想定で先行して整備している。
 *
 * status:
 *  - "confirmed"   実数値が確定している
 *  - "unconfirmed" ヒアリング時点で「?」付き、または本人未確認のため公開前に確認が必要
 *  - "unknown"     現時点でデータそのものが存在しない（"不明"と回答されたもの）
 */

export type DeptStatStatus = "confirmed" | "unconfirmed" | "unknown";

export interface DepartmentStat {
  id: string;
  label: string;
  status: DeptStatStatus;
  /** confirmed の場合のみ使用する実数値 */
  value?: number;
  /**
   * unconfirmed/unknown の項目をレイアウト確認用に表示する場合の仮数値（例: 99）。
   * status が "confirmed" でない限り、実数値として扱わないこと。
   * 表示する際は必ず「仮」であることが分かるUIにする。
   */
  placeholderValue?: number;
  unit?: string;
  note?: string;
  /** unconfirmed/unknown の場合に表示できる補足 */
  pendingNote?: string;
}

export const salesStats: DepartmentStat[] = [
  {
    id: "sales-avg-income",
    label: "平均年収",
    status: "confirmed",
    value: 570,
    unit: "万円",
    note: "360万円〜780万円の平均で算出",
  },
  {
    id: "sales-salary-raise",
    label: "給与ベースアップ",
    status: "confirmed",
    note: "毎年実施",
  },
  {
    id: "sales-max-income",
    label: "最高年収例",
    status: "unconfirmed",
    placeholderValue: 99,
    unit: "万円",
    pendingNote: "1,500万円と共有いただいたが「?」付きのため、正式な数値として確認予定",
  },
  {
    id: "sales-promotion-speed",
    label: "昇進スピード",
    status: "unconfirmed",
    placeholderValue: 99,
    unit: "ヶ月",
    pendingNote:
      "「最短3か月」との情報あり。特定個人の事例に基づく可能性があるため、一般的な訴求として使えるか、本人確認や複数事例の有無を確認予定",
  },
  {
    id: "sales-team-achievement",
    label: "営業チームの達成率",
    status: "unknown",
    placeholderValue: 99,
    unit: "%",
  },
  {
    id: "sales-avg-deals",
    label: "年間成約件数の平均",
    status: "unknown",
    placeholderValue: 99,
    unit: "件",
  },
];

export const adminStats: DepartmentStat[] = [
  {
    id: "admin-inexperienced-rate",
    label: "未経験スタート率",
    status: "confirmed",
    value: 100,
    unit: "%",
  },
  {
    id: "admin-overtime",
    label: "月平均残業時間",
    status: "confirmed",
    note: "0〜3時間（2025年実績）",
  },
  {
    id: "admin-holidays",
    label: "年間休日",
    status: "confirmed",
    value: 127,
    unit: "日",
    note: "2025年実績",
  },
  {
    id: "admin-female-ratio",
    label: "女性比率",
    status: "confirmed",
    value: 100,
    unit: "%",
  },
];

export const constructionStats: DepartmentStat[] = [
  {
    id: "construction-avg-income",
    label: "平均年収（施工管理職）",
    status: "confirmed",
    value: 800,
    unit: "万円",
    note: "2025年実績",
  },
  {
    id: "construction-qualified-staff",
    label: "有資格者数・資格取得率",
    status: "unconfirmed",
    placeholderValue: 99,
    unit: "%",
    pendingNote: "対象とする資格の種類（例：施工管理技士、解体工事施工技士 等）を確認予定",
  },
  {
    id: "construction-schedule-compliance",
    label: "工期遵守率",
    status: "unknown",
    placeholderValue: 99,
    unit: "%",
  },
  {
    id: "construction-safety-record",
    label: "安全記録",
    status: "unconfirmed",
    placeholderValue: 99,
    unit: "%",
    pendingNote: "「事故数の低さ」という表現案あり。具体的な件数・比率が確認でき次第、数値として掲載予定",
  },
  {
    id: "construction-avg-project-size",
    label: "1案件あたりの平均規模",
    status: "unknown",
    placeholderValue: 99,
    unit: "坪",
  },
];
