import { Hero } from "@/components/top/Hero";
import { MissionVisionValue } from "@/components/top/MissionVisionValue";
import { AboutTeaser } from "@/components/top/AboutTeaser";
import { PeoplePickup } from "@/components/top/PeoplePickup";
import { WorkPickup } from "@/components/top/WorkPickup";
import { RecruitingInformation } from "@/components/top/RecruitingInformation";
import { FaqPickup } from "@/components/top/FaqPickup";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVisionValue />
      <AboutTeaser />
      <PeoplePickup />
      <WorkPickup />
      <RecruitingInformation />
      <FaqPickup />
    </>
  );
}
