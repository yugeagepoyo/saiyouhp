"use client";

import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Marquee } from "@/components/ui/Marquee";
import type { Leader } from "@/data/leaders";

/** 自動スクロール速度（px/秒）。人物と氏名を認識できる範囲で、ゆっくり流し続ける。 */
const SPEED = 30;

function LeaderCard({ leader, clone }: { leader: Leader; clone: boolean }) {
  const body = (
    <>
      <div className="photo-mono relative aspect-[3/4] w-full overflow-hidden">
        <PlaceholderImage
          alt={`${leader.role} ${leader.name}`}
          label={leader.photoLabel}
          src={leader.photoSrc}
        />
      </div>
      {/* 情報エリアは写真と同じ幅・同じ左端。囲みは作らず、余白と文字の強弱だけで階層をつける。
          リンクの有無で高さが変わらないよう、最小高さを揃えている。 */}
      <div className="min-h-[7.5rem] pt-5 md:min-h-[8.5rem] md:pt-6">
        <p className="text-[11px] tracking-[0.18em] text-[var(--color-accent-600)] md:text-xs">
          {leader.role}
        </p>
        <p className="font-serif-jp mt-2.5 text-xl leading-snug font-bold text-[var(--color-ink-900)] md:text-2xl">
          {leader.name}
        </p>
        <p className="font-heading-en mt-2.5 text-[10px] tracking-[0.26em] text-[var(--color-ink-500)] uppercase md:text-[11px]">
          {leader.nameEn}
        </p>
        {leader.personSlug && (
          <span className="mt-4 inline-block text-[11px] text-[var(--color-accent-600)]">
            インタビューを見る →
          </span>
        )}
      </div>
    </>
  );

  return (
    // ホバーで前面に出しつつ少しだけ拡大する。transform なので周囲のレイアウトは動かない。
    <div className="relative mr-7 w-[180px] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-[1.04] md:mr-16 md:w-[240px] lg:w-[264px]">
      {leader.personSlug ? (
        <Link
          href={`/people/${leader.personSlug}`}
          className="group block"
          tabIndex={clone ? -1 : undefined}
          draggable={false}
        >
          {body}
        </Link>
      ) : (
        <div className="group">{body}</div>
      )}
    </div>
  );
}

/** 部門長の人物カルーセル（右→左へ流れる）。 */
export function LeadersMarquee({ leaders }: { leaders: Leader[] }) {
  return (
    <Marquee
      items={leaders}
      getKey={(leader) => leader.id}
      speed={SPEED}
      direction="left"
      renderItem={(leader, clone) => <LeaderCard leader={leader} clone={clone} />}
    />
  );
}
