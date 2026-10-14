"use client";

import { Marquee } from "@/components/ui/Marquee";
import { InterviewCard } from "@/components/people/InterviewCard";
import type { Person } from "@/data/people";

/** 部門長カルーセルよりほんの少しだけ速く流す。 */
const SPEED = 36;

/** 社員インタビューのカルーセル（右→左へ流れる）。TOPの「人を知る」で使用する。 */
export function InterviewCarousel({ people }: { people: Person[] }) {
  return (
    <Marquee
      items={people}
      getKey={(person) => person.slug}
      speed={SPEED}
      direction="left"
      renderItem={(person, clone) => (
        <div className="relative mr-6 w-[78vw] max-w-[340px] shrink-0 sm:w-[260px] md:mr-12 md:w-[300px] lg:w-[340px]">
          <InterviewCard person={person} clone={clone} showLinkText={false} hoverOverlay />
        </div>
      )}
    />
  );
}
