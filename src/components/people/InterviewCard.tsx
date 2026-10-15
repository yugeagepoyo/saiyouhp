import Link from "next/link";
import Image from "next/image";
import { getDepartmentById } from "@/data/departments";
import type { Person } from "@/data/people";

/**
 * 所属と役職を「第二営業部 / 主任」の形で返す。
 * unit が未設定の場合は部署データの名称を使い、役職が未共有なら所属のみ。
 */
export function getAffiliation(person: Person) {
  const unit = person.unit ?? getDepartmentById(person.departmentId)?.name;
  const parts = [unit, person.position].filter(Boolean);
  if (parts.length > 0) return parts.join(" / ");
  return person.role ?? "";
}

/**
 * 社員インタビューのカード。TOPの流れるカルーセルと「人を知る」の一覧で共通利用する。
 * 写真は 4:5、情報エリアは細い罫線で区切った雑誌の人物紹介のような見せ方。
 * 幅は置かれる側（カルーセル／グリッド）が決め、中身の寸法は全員共通にする。
 */
export function InterviewCard({
  person,
  clone = false,
  showLinkText = true,
  hoverOverlay = false,
}: {
  person: Person;
  clone?: boolean;
  /** カード内に「インタビューを見る」ボタンを出すかどうか */
  showLinkText?: boolean;
  /** ホバーで白い半透明と円形の VIEW MORE を重ねるか（TOPのカルーセル用） */
  hoverOverlay?: boolean;
}) {
  const affiliation = getAffiliation(person);

  return (
    <Link
      href={`/people/${person.slug}`}
      className="group @container block"
      tabIndex={clone ? -1 : undefined}
      draggable={false}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-100)]">
        {person.photoSrc ? (
          <Image
            src={person.photoSrc}
            alt={`${affiliation} ${person.name}`}
            fill
            sizes="(max-width: 640px) 78vw, 340px"
            className="object-cover"
            style={person.photoPosition ? { objectPosition: person.photoPosition } : undefined}
            draggable={false}
          />
        ) : (
          <div
            role="img"
            aria-label={person.name}
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-ink-700)_0%,var(--color-ink-900)_60%)] px-4 text-center text-xs tracking-[0.15em] text-[var(--color-paper-100)]/70 uppercase"
          >
            社員写真（仮）
          </div>
        )}

        {hoverOverlay && (
          // 写真が消えない程度の白を重ね、中央に細い円の VIEW MORE を出す。
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--color-paper-050)]/55 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
          >
            <span className="font-heading-en flex h-28 w-28 items-center justify-center rounded-full border border-[var(--color-ink-900)] text-center text-[11px] tracking-[0.18em] text-[var(--color-ink-900)] uppercase md:h-32 md:w-32 md:text-xs">
              View More
            </span>
          </span>
        )}
      </div>

      <div
        className={`${
          showLinkText ? "min-h-[13rem] md:min-h-[14rem]" : "min-h-[8.5rem] md:min-h-[9.5rem]"
        } border-t border-[var(--color-paper-200)] pt-5`}
      >
        <p className="text-[13px] tracking-[0.12em] text-[var(--color-ink-900)] md:text-sm">
          {affiliation}
        </p>
        <p className="font-serif-jp mt-2.5 text-xl leading-snug font-bold text-[var(--color-ink-900)] md:text-2xl">
          {person.name}
        </p>
        {/* 英字表記はデザイン要素として大きく。読みが未共有の方は空欄。 */}
        {/* 名前が長くても折り返さないよう、カード幅に合わせて文字サイズを決める（カードの高さを全員そろえるため）。 */}
        <p className="font-heading-en mt-3 text-[clamp(1.1rem,8.2cqw,2.75rem)] leading-[1.05] font-semibold tracking-[0.02em] whitespace-nowrap text-[var(--color-ink-900)]/20 uppercase">
          {person.nameEn ?? ""}
        </p>
        {showLinkText && (
          <span className="mt-5 inline-flex items-center justify-center rounded-sm border border-[var(--color-accent-600)] bg-[var(--color-accent-600)] px-6 py-3 text-sm font-bold text-[var(--color-paper-050)] transition-colors group-hover:bg-transparent group-hover:text-[var(--color-accent-600)]">
            インタビューを見る
          </span>
        )}
      </div>
    </Link>
  );
}
