export type NavIconName =
  | "home"
  | "about"
  | "people"
  | "work"
  | "recruit"
  | "faq"
  | "entry"
  | "departments"
  | "interview"
  | "message"
  | "business"
  | "numbers"
  | "workplace"
  | "growth"
  | "community"
  | "benefits";

export interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
  children?: NavItem[];
}

/** ハンバーガーメニュー・左側レールナビ共通のナビゲーション項目 */
export const navItems: NavItem[] = [
  { label: "TOP", href: "/", icon: "home" },
  {
    label: "ノーブデンスについて",
    href: "/about",
    icon: "about",
    children: [
      { label: "事業内容", href: "/about#business", icon: "business" },
      { label: "数字で見るノーブデンス", href: "/about#numbers", icon: "numbers" },
      { label: "職場環境", href: "/about#workplace", icon: "workplace" },
      { label: "社員の成長とキャリア形成", href: "/about#growth", icon: "growth" },
      { label: "地域や社会への還元", href: "/about#community", icon: "community" },
      { label: "福利厚生", href: "/about#benefits", icon: "benefits" },
    ],
  },
  {
    label: "人を知る",
    href: "/people",
    icon: "people",
    children: [
      { label: "社員インタビュー", href: "/people#interview", icon: "interview" },
      { label: "社長・部長メッセージ", href: "/people#message", icon: "message" },
    ],
  },
  {
    label: "仕事を知る",
    href: "/work",
    icon: "work",
    children: [
      { label: "部署紹介", href: "/work#departments", icon: "departments" },
      { label: "募集職種一覧", href: "/recruit", icon: "recruit" },
    ],
  },
  { label: "FAQ", href: "/faq", icon: "faq" },
];

export const CORPORATE_SITE_URL = "https://norbdence.co.jp/";
export const SITE_URL = "https://recruit.norbdence.co.jp";
export const ENTRY_HREF = "/entry";
