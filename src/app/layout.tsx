import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, Jost } from "next/font/google";
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

/**
 * 日本語2書体（Noto Sans JP / Noto Serif JP）だけはGoogle Fontsのスタイルシートから読み込む。
 * next/font/google で読むと、CJKを約120分割した woff2 を2書体×3ウェイトぶん
 * （計744ファイル）ビルド時に取得するため、fonts.gstatic.com への接続が詰まって
 * ビルドが落ちることがある（Vercelのコールドビルドで再現）。
 * CDN配信なら実際に使う文字の分割ファイルだけが読み込まれ、ビルドは外部通信に依存しない。
 * 書体・ウェイト（400/500/700）は従来と同じ。
 */
const JP_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap";

// ナビゲーション・小見出し・数字用：細身で直線的なモダン・グロテスク。
// 「数字で見るノーブデンス」の数値を太く大きく見せるため、SemiBold(600)も読み込む。
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

// 大見出し（英字）用：ファッション誌のようなハイコントラストなモダンセリフ。
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// 英字見出し（セクション名・ページ名）・右下固定ENTRYボタン・エントリー完了画面の
// 大きな「THANK YOU」で使う幾何学サンセリフ。Futura系の端正な字面で、
// 建築・エディトリアルの文脈に合うフォーマルな表情にする。
// 見出しは Light(300)、ENTRYボタンは Regular(400)、THANK YOU は SemiBold(600)。
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
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
      className={`${archivo.variable} ${bodoniModa.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* 日本語フォント。React が <head> へ巻き上げる。 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={JP_FONTS_HREF} precedence="default" />
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
