import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novacad.com.mx";
  const now = new Date();

  const serviceUrls = serviceCategories.flatMap((category) =>
    category.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
  ];
}
