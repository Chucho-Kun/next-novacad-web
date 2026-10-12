import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/services";
import { videos } from "@/data/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novacad.com.mx";
  // lastModified estable por grupo (SPEC 11): no usar `new Date()` por build.
  // Al cambiar contenido, actualizar la constante de su grupo y documentarlo en AGENTS.md.
  const HOME_LAST_MODIFIED = new Date("2026-10-12T12:00:00-06:00");
  const SERVICES_LAST_MODIFIED = new Date("2026-10-12T12:00:00-06:00");

  const serviceUrls = serviceCategories.flatMap((category) =>
    category.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: SERVICES_LAST_MODIFIED,
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
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
    ...videoUrls,
  ];
}
