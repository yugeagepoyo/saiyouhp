import Link from "next/link";
import Image from "next/image";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  return (
    <header className="sticky top-0 z-[220] border-b border-[var(--color-paper-200)] bg-[var(--color-paper-050)]/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-[var(--container-page)] items-center px-6 md:h-20 md:px-10">
        {/* ロゴは画像。高さだけを指定し幅は auto にすることで、
            画面幅によらず元画像の縦横比をそのまま保つ。 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/recruit-logo.png"
            alt="NORBDENCE RECRUIT"
            width={1200}
            height={69}
            priority
            sizes="(min-width: 768px) 280px, 244px"
            className="h-[14px] w-auto md:h-4"
          />
        </Link>
      </div>
      {/* ボタン・メニューは HeaderNav 内で document.body へポータルし、
          スクロール位置に関わらず常にビューポート右上に固定表示する */}
      <HeaderNav />
    </header>
  );
}
