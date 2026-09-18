import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/nav";
import { ALLOW_INDEXING } from "@/lib/siteEnv";

export default function robots(): MetadataRoute.Robots {
  // 共有用URL・確認用URLは検索結果に出さない。
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
