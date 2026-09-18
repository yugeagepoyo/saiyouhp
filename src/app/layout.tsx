import type { Metadata } from "next";
import { Noto_Sans_JP, Archivo, Bodoni_Moda, Shippori_Mincho, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { Footer } from "@/components/layout/Footer";
import { SideRailNav } from "@/components/layout/SideRailNav";
import { FloatingEntryButton } from "@/components/layout/FloatingEntryButton";
import { RouteTransitionOverlay } from "@/components/layout/RouteTransitionOverlay";
import { SITE_URL } from "@/data/nav";
import { ALLOW_INDEXING } from "@/lib/siteEnv";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ナビゲーション・小見出し・数字用：細身で直線的なモダン・グロテスク。
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

// 大見出し（英字）用：ファッション誌のようなハイコントラストなモダンセリフ。
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

// 右下固定ENTRYボタンの英字専用フォント。縦長に見えないよう、幅広で幾何学的なsansを採用。
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteTitle = "採用サイト｜株式会社ノーブデンス";
const siteDescription =
  "株式会社ノーブデンスの採用サイト。すべてに品格を、信頼の先の信用へ。若い会社の勢いと、確かな品格を両立する仲間を募集しています。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s｜NORBDENCE RECRUIT",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "NORBDENCE RECRUIT",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  // 既定は noindex。NEXT_PUBLIC_ALLOW_INDEXING=true のときだけインデックスを許可する。
  robots: {
    index: ALLOW_INDEXING,
    follow: ALLOW_INDEXING,
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${notoSansJp.variable} ${archivo.variable} ${bodoniModa.variable} ${shipporiMincho.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <RouteTransitionOverlay />
        <Header />
        <SiteSearch />
        <SideRailNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingEntryButton />
        <SpeedInsights />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
