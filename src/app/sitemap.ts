import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/nav";
import { jobs } from "@/data/jobs";
import { people } from "@/data/people";

/**
 * 公開中のページのみを列挙する。
 * 募集を公開していない職種（published: false）と、
 * 一覧に出していない人物（サンプル・代表／部門長）は含めない。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = ["", "/about", "/work", "/recruit", "/people", "/faq", "/contact", "/entry"];

  const jobPaths = jobs.filter((job) => job.published).map((job) => `/recruit/${job.slug}`);

  // 「人を知る」の一覧と同じ条件（実データのある社員のみ）。
  const peoplePaths = people
    .filter((person) => !person.isLeadership && !person.isSample)
    .map((person) => `/people/${person.slug}`);

  return [...staticPaths, ...jobPaths, ...peoplePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
