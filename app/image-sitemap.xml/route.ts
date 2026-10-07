import { images } from "@/data/images";

const baseUrl = "https://novacad.com.mx";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const grouped = new Map<string, typeof images>();
  for (const image of images) {
    const list = grouped.get(image.pageUrl);
    if (list) {
      list.push(image);
    } else {
      grouped.set(image.pageUrl, [image]);
    }
  }

  const urls = [...grouped.entries()]
    .map(([pageUrl, pageImages]) => {
      const pageLoc = `${baseUrl}${pageUrl}`;
      const imageTags = pageImages
        .map((image) => {
          const imageLoc = `${baseUrl}${image.src}`;
          return `    <image:image>
      <image:loc>${imageLoc}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`;
        })
        .join("\n");
      return `  <url>
    <loc>${pageLoc}</loc>
${imageTags}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
