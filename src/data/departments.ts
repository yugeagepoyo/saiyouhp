/**
 * 部署データ。TOPページでは簡易プレビュー（役割の概要のみ）に使用し、
 * /work ページではクリックで役割・仕事内容・関係部署・関連リンクまで表示する。
 */

export type DepartmentHoverEffect =
  | "rising-numbers" // 営業部: 数字/矢印が上昇
  | "aligning-info" // 管理部: 情報が整列
  | "building-lines" // 建設事業部: 線が組み上がる
  | "deconstructing-blocks" // 解体施工部: ブロックが分解→再構成
  | "growing-graph" // 財務戦略部: グラフ線が伸びる
  | "converging-light"; // 社長室: 中心に収束する

export interface Department {
  id: string;
  name: string;
  /** 募集職種カードなどで小さく添える英字表記 */
  nameEn: string;
  shortDescription: string;
  hoverEffect: DepartmentHoverEffect;
  /** 部署の役割 */
  role: string;
  /** 主な仕事内容 */
  tasks: string[];
  /** 関係する部署のid */
  relatedDepartmentIds: string[];
}

export const departments: Department[] = [
  {
    id: "sales",
    name: "営業部",
    nameEn: "Sales",
    shortDescription: "案件・顧客との接点をつくり、事業をリードする",
    hoverEffect: "rising-numbers",
    role: "お客様や物件情報との最初の接点をつくり、案件を動かす起点となる部署です。",
    tasks: ["新規・既存顧客への提案", "物件・案件の発掘と調整", "契約に関する折衝", "他部署への案件連携"],
    relatedDepartmentIds: ["admin", "construction", "demolition", "finance"],
  },
  {
    id: "admin",
    name: "管理部",
    nameEn: "Administration",
    shortDescription: "各事業を裏方から支え、円滑な業務進行を支える",
    hoverEffect: "aligning-info",
    role: "会社全体の運営を支え、社員が安心して働ける環境や、組織がスムーズに動くための仕組みを整える部署です。",
    tasks: ["契約書類・各種書類の作成管理", "顧客対応のサポート", "社内の情報整理・スケジュール管理"],
    relatedDepartmentIds: ["sales", "construction", "demolition", "finance"],
  },
  {
    id: "construction",
    name: "建設事業部",
    nameEn: "Construction",
    shortDescription: "確かな技術で物件の価値をかたちにする",
    hoverEffect: "building-lines",
    role: "営業部が獲得した案件を、確かな技術と品質管理で形にする部署です。",
    tasks: ["施工管理・工程管理", "協力会社との調整", "安全管理・品質管理"],
    relatedDepartmentIds: ["sales", "admin", "demolition"],
  },
  {
    id: "demolition",
    name: "解体施工部",
    nameEn: "Demolition",
    shortDescription: "安全第一で解体・産業廃棄物処理を担う",
    hoverEffect: "deconstructing-blocks",
    role: "解体工事と産業廃棄物処理を安全かつ適正に進め、次の土地活用の可能性を拓く部署です。",
    tasks: ["解体工事の計画・施工管理", "産業廃棄物の適正処理", "安全管理"],
    relatedDepartmentIds: ["construction", "sales", "admin"],
  },
  {
    id: "finance",
    name: "財務戦略部",
    nameEn: "Finance",
    shortDescription: "数字の面から会社の成長を設計する",
    hoverEffect: "growing-graph",
    role: "会社全体の数字を管理し、成長のための投資判断や資金計画を支える部署です。",
    tasks: ["予算管理・資金計画・資金調達", "経営数値の分析", "銀行との折衝"],
    relatedDepartmentIds: ["executive", "sales", "admin"],
  },
  {
    id: "executive",
    name: "社長室",
    nameEn: "Executive",
    shortDescription: "経営の意思決定と各部門の連携をつなぐ",
    hoverEffect: "converging-light",
    role: "経営の意思決定を担い、各部署の連携を最終的にまとめる部署です。",
    tasks: ["経営方針の策定", "各部署との連携・意思決定", "対外的な渉外業務"],
    relatedDepartmentIds: ["finance", "sales", "construction", "demolition", "admin"],
  },
];

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}
