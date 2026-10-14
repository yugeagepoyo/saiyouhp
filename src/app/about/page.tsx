import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CenterCarousel } from "@/components/ui/CenterCarousel";
import { VerticalStats } from "@/components/about/VerticalStats";
import { FiveSensesFace } from "@/components/about/FiveSensesFace";
import { CommunityStory } from "@/components/about/CommunityStory";
import { BusinessLines } from "@/components/about/BusinessLines";
import { OfficeShowcase } from "@/components/about/OfficeShowcase";
import { FeaturedBenefits } from "@/components/about/FeaturedBenefits";
import { PositionNetwork } from "@/components/about/PositionNetwork";
import { BenefitsGrid } from "@/components/about/BenefitsGrid";
import { WorkDiagram } from "@/components/work/WorkDiagram";
import { companyStats } from "@/data/company";
import { communityActivities } from "@/data/community";
import { offices } from "@/data/offices";
import { uniqueBenefits, treatmentBenefits, featuredBenefits } from "@/data/benefits";

export const metadata: Metadata = {
  title: "ノーブデンスについて",
  description:
    "事業内容、数字で見るノーブデンス、部署構成、職場環境、成長支援、福利厚生など、株式会社ノーブデンスについてご紹介します。",
};

const growthCareerCards = [
  { title: "早期からの裁量", text: "年齢や社歴に関わらず、成果と成長意欲を評価する文化があります。" },
  { title: "資格取得支援", text: "業務に関連する資格の取得を、費用面も含めてサポートしています。" },
  { title: "キャリアの複線化", text: "現場・管理・営業など、本人の適性に応じたキャリアパスを用意しています。" },
];

const training = [
  "入社時研修（会社理解・基礎知識習得）",
  "OJTによる実務研修",
  "資格取得支援・受験費用サポート",
  "階層別研修（将来的なキャリアアップに応じて拡充予定）",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Norbdence" title="ノーブデンスについて" />

      <section id="business" className="scroll-mt-20 py-24 md:py-36">
        <Container>
          <SectionHeading eyebrow="Business" title="事業内容" />
          <BusinessLines />
        </Container>
      </section>

      <section className="section-blend blend-paper-100 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Strengths" title="業界でのポジションと強み" />
          <p className="mt-8 text-sm leading-relaxed text-[var(--color-ink-700)] md:text-base">
            不動産・建築・解体産廃という複数事業を自社で連携させ、一貫したサービスを提供できる体制
          </p>

          {/* 共有資料の相関図をインタラクティブ化したもの（静止画は廃止）。 */}
          <PositionNetwork />
        </Container>
      </section>

      <section id="numbers" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Numbers" title="数字で見るノーブデンス" align="center" />
          <div className="mt-12">
            <VerticalStats stats={companyStats} />
          </div>
        </Container>
      </section>

      <section className="section-blend blend-paper-100 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="部署構成"
            description="6つの部署が連携して仕事を進めています。部署をクリックすると詳細を確認できます。"
          />
          <div className="mt-12">
            <WorkDiagram />
          </div>
        </Container>
      </section>

      <section id="workplace" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Five Senses"
            title="社員が輝く職場環境／五感で楽しむ職場づくり"
            description="視覚・聴覚・嗅覚・味覚・触覚——それぞれの観点から、働く環境づくりへのこだわりをご紹介します。"
          />
          <div className="mt-12">
            <FiveSensesFace />
          </div>

          <div className="mt-20 md:mt-28">
            <SectionHeading eyebrow="Office" title="オフィス紹介" align="center" />
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-700)] md:text-base">
              本社オフィスは、部署を越えたコミュニケーションが自然に生まれるレイアウトを意識しています。
              若手からベテランまで、フラットに意見を交わせる雰囲気づくりを大切にしています。
            </p>
            <OfficeShowcase offices={offices} />
          </div>
        </Container>
      </section>

      <section id="growth" className="section-blend blend-paper-100 scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Growth" title="社員の成長とキャリア形成" />
          <div className="mt-10">
            <CenterCarousel>
              {growthCareerCards.map((c) => (
                <div
                  key={c.title}
                  className="flex aspect-[4/5] flex-col justify-end rounded-3xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)] p-8 shadow-sm"
                >
                  <p className="text-lg font-bold text-[var(--color-ink-900)]">{c.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{c.text}</p>
                </div>
              ))}
            </CenterCarousel>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Training" title="研修や成長支援" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {training.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="community" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Community" title="地域や社会への還元" />
          <div className="mt-10">
            <CommunityStory activities={communityActivities} />
          </div>
        </Container>
      </section>

      <section id="benefits" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Benefits" title="福利厚生" align="center" />
          <div className="mt-10 md:mt-12">
            <FeaturedBenefits benefits={featuredBenefits} />
          </div>
          <div className="mt-20 md:mt-28">
            <BenefitsGrid uniqueBenefits={uniqueBenefits} treatmentBenefits={treatmentBenefits} />
          </div>
        </Container>
      </section>
    </>
  );
}
