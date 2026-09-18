/**
 * サイト内ワード検索用のインデックス。
 * 既存の各データソース（求人・社員・FAQ・福利厚生など）から軽量に生成し、
 * 追加ライブラリなしで単純な部分一致検索を行う。
 */
import { jobs } from "./jobs";
import { people } from "./people";
import { faqItems, faqCategories } from "./faq";
import { uniqueBenefits, treatmentBenefits } from "./benefits";
import { departments } from "./departments";
import { companyOverview } from "./company";

export interface SearchEntry {
  title: string;
  description: string;
  url: string;
  category: string;
  /** 検索対象となる語句（title/descriptionに含まれない関連キーワードも含める） */
  keywords?: string;
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const job of jobs.filter((j) => j.published)) {
    entries.push({
      title: job.title,
      description: job.summary,
      url: `/recruit/${job.slug}`,
      category: "募集職種",
      keywords: [job.workDetails, job.requiredExperience, job.requiredQualifications, job.employmentType]
        .filter(Boolean)
        .join(" "),
    });
  }

  for (const person of people) {
    entries.push({
      title: `${person.name}（${person.role}）`,
      description: person.quote,
      url: `/people/${person.slug}`,
      category: "社員インタビュー",
      keywords: [
        person.currentWork,
        person.previousCareer,
        person.reasonForJoining,
        person.teamAtmosphere,
        person.role,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  for (const item of faqItems) {
    const catLabel = faqCategories.find((c) => c.id === item.categoryId)?.label ?? "";
    entries.push({
      title: item.question,
      description: item.answer,
      url: "/faq",
      category: `FAQ・${catLabel}`,
    });
  }

  for (const item of uniqueBenefits) {
    entries.push({
      title: item.label,
      description: item.detail ?? "独自の福利厚生",
      url: "/about#benefits",
      category: "福利厚生",
    });
  }
  for (const item of treatmentBenefits) {
    entries.push({
      title: item.label,
      description: item.detail ?? "待遇",
      url: "/about#benefits",
      category: "福利厚生・待遇",
    });
  }

  for (const dept of departments) {
    entries.push({
      title: dept.name,
      description: dept.role,
      url: "/work#departments",
      category: "部署",
      keywords: dept.tasks.join(" "),
    });
  }

  for (const row of companyOverview.overviewTable) {
    entries.push({
      title: row.label,
      description: typeof row.value === "string" ? row.value : "",
      url: "/about",
      category: "会社情報",
    });
  }

  return entries;
}

export const searchIndex: SearchEntry[] = buildIndex();

export function searchSite(keyword: string, limit = 20): SearchEntry[] {
  const q = keyword.trim();
  if (!q) return [];
  return searchIndex
    .filter((entry) => {
      const haystack = `${entry.title} ${entry.description} ${entry.keywords ?? ""}`;
      return haystack.includes(q);
    })
    .slice(0, limit);
}
