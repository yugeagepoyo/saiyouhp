import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/nav";

/**
 * 現時点ではTOPページのみ実装済みのため静的ルートのみを列挙している。
 * 下層ページ（/about, /people, /work, /recruit, /faq, /contact, /entry）を
 * 実装した際は、求人・インタビューの動的ルートも含めてここに追加する。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
