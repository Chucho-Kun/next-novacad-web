import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://novacad.com.mx/sitemap.xml",
      "https://novacad.com.mx/video-sitemap.xml",
    ],
    host: "https://novacad.com.mx",
  };
}
