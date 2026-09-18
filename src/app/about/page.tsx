import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { CenterCarousel } from "@/components/ui/CenterCarousel";
import { VerticalStats } from "@/components/about/VerticalStats";
import { FiveSensesFace } from "@/components/about/FiveSensesFace";
import { CommunityStory } from "@/components/about/CommunityStory";
import { BenefitsGrid } from "@/components/about/BenefitsGrid";
import { WorkDiagram } from "@/components/work/WorkDiagram";
import { companyStats } from "@/data/company";
import { communityActivities } from "@/data/community";
import { uniqueBenefits, treatmentBenefits } from "@/data/benefits";

export const metadata: Metadata = {
  title: "ノーブデンスについて",
  description:
    "事業内容、数字で見るノーブデンス、部署構成、職場環境、成長支援、福利厚生など、株式会社ノーブデンスについてご紹介します。",
};

/** 業界ポジション図（共有資料の画像）。差し替えは同名PNGの上書きでよい。 */
const POSITION_DIAGRAM_SRC = "/images/position-diagram.png";

const businessLines = [
  { title: "不動産事業", text: "物件の売買・仲介を通じて、お客様に最適な選択肢をご提案します。" },
  { title: "建築事業", text: "確かな技術と品質管理で、物件の価値をかたちにします。" },
  { title: "解体事業", text: "安全第一で解体工事を行い、次の土地活用の可能性を拓きます。" },
  { title: "産業廃棄物収集運搬", text: "適正な処理・運搬体制で、環境と地域社会に配慮した事業を行います。" },
];

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
      <PageHeader
        eyebrow="About Norbdence"
        title="ノーブデンスについて"
        description="事業内容から働く環境まで、株式会社ノーブデンスについてご紹介します。"
      />

      <section id="business" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Business" title="事業内容" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {businessLines.map((b) => (
              <div key={b.title} className="rounded-2xl border border-[var(--color-paper-200)] p-6">
                <p className="font-bold text-[var(--color-ink-900)]">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-700)]">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-paper-100)] py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Strengths" title="業界でのポジションと強み" />
          <p className="mt-8 text-sm leading-relaxed text-[var(--color-ink-700)] md:text-base">
            不動産・建築・解体産廃という複数事業を自社で連携させ、一貫したサービスを提供できる体制
          </p>

          {/* 共有資料「業界でのポジションや強み」の図をそのまま掲載する。
              図は文字が切れないよう、トリミングせず全体を表示する。 */}
          <figure className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-paper-200)] bg-[var(--color-paper-050)]">
            <Image
              src={POSITION_DIAGRAM_SRC}
              alt="業界でのポジションや強み：競合ではなく取引業者・協力会社として、リフォーム会社・不動産会社・大工・商社担当者・解体担当者と双方向に取引する関係図"
              width={1327}
              height={742}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full"
            />
          </figure>
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

      <section className="bg-[var(--color-paper-100)] py-20 md:py-28">
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

          <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <RevealImage alt="オフィスの様子" label="オフィス写真（仮）" aspectClassName="aspect-[4/3]" parallax />
            <div>
              <SectionHeading eyebrow="Office" title="オフィス紹介" />
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink-700)] md:text-base">
                本社オフィスは、部署を越えたコミュニケーションが自然に生まれるレイアウトを意識しています。
                若手からベテランまで、フラットに意見を交わせる雰囲気づくりを大切にしています。
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="growth" className="scroll-mt-20 bg-[var(--color-paper-100)] py-20 md:py-28">
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
          <SectionHeading eyebrow="Benefits" title="福利厚生" />
          <div className="mt-10">
            <BenefitsGrid uniqueBenefits={uniqueBenefits} treatmentBenefits={treatmentBenefits} />
          </div>
        </Container>
      </section>
    </>
  );
}
