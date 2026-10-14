"use client";

import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { getDepartmentById } from "@/data/departments";
import type { Person } from "@/data/people";

/** 部門長カルーセルよりほんの少しだけ速く、向きは逆（左→右）にする。 */
const SPEED = 36;

/**
 * 社員インタビューのカード。
 * 部門長カルーセルと区別するため、写真は 4:5 で大きく取り、
 * 情報エリアは細い罫線で区切った雑誌の人物紹介のような見せ方にする。
 * 人数が増えても同じ寸法で並ぶよう、カード幅・写真比率・各行の位置は固定。
 */
function InterviewCard({ person, clone }: { person: Person; clone: boolean }) {
  const dept = getDepartmentById(person.departmentId);
  // 「第二営業部 主任」のように役職へ所属を含めている場合は、部署名を重ねて出さない。
  const affiliation = person.role?.includes(dept?.name ?? "\u0000")
    ? person.role
    : [dept?.name, person.role].filter(Boolean).join(" ");
  const hasInterview = !person.interviewPending;

  const body = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-100)]">
        {person.photoSrc ? (
          <Image
            src={person.photoSrc}
            alt={`${affiliation} ${person.name}`}
            fill
            sizes="(max-width: 640px) 78vw, 320px"
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
      </div>

      <div className="min-h-[9.5rem] border-t border-[var(--color-paper-200)] pt-5 md:min-h-[10.5rem]">
        <p className="text-[11px] tracking-[0.16em] text-[var(--color-ink-500)] md:text-xs">
          {affiliation}
        </p>
        <p className="font-serif-jp mt-2.5 text-xl leading-snug font-bold text-[var(--color-ink-900)] md:text-2xl">
          {person.name}
        </p>
        <p className="mt-2.5 min-h-[1rem] text-[11px] tracking-[0.2em] text-[var(--color-accent-600)]">
          {person.kana ?? ""}
        </p>
        {/* 本文が未登録の方はリンクを出さない（仮の本文は作らない）。 */}
        {hasInterview && (
          <span className="mt-4 inline-block text-[11px] text-[var(--color-accent-600)]">
            インタビューを見る →
          </span>
        )}
      </div>
    </>
  );

  return (
    <div className="relative mr-6 w-[78vw] max-w-[320px] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-[1.04] sm:w-[260px] md:mr-12 md:w-[300px] lg:w-[320px]">
      {hasInterview ? (
        <Link
          href={`/people/${person.slug}`}
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

/** 社員インタビューのカルーセル（左→右へ流れる）。 */
export function InterviewCarousel({ people }: { people: Person[] }) {
  return (
    <Marquee
      items={people}
      getKey={(person) => person.slug}
      speed={SPEED}
      direction="right"
      renderItem={(person, clone) => <InterviewCard person={person} clone={clone} />}
    />
  );
}
