import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/services";
import { videos } from "@/data/videos";

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

  const videoUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(videos[0].uploadDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...videos.map((video) => ({
      url: `${baseUrl}/videos/${video.id}`,
      lastModified: new Date(video.uploadDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
    ...videoUrls,
  ];
}
