import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { videos } from "@/data/videos";

const baseUrl = "https://novacad.com.mx";
const canonical = `${baseUrl}/videos`;

export const metadata: Metadata = {
  title: "Videos de procedimientos dentales | NOVACAD",
  description:
    "Galería de videos cortos del laboratorio NOVACAD: fresado de zirconia, E-max, PMMA, resina híbrida, diseño de sonrisa, guardas y guías quirúrgicas.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Videos de procedimientos dentales | NOVACAD",
    description:
      "Mira los procedimientos del laboratorio dental NOVACAD en video: zirconia, E-max, PMMA y más.",
    url: canonical,
    type: "website",
    locale: "es_MX",
    images: videos.map((video) => ({
      url: `${baseUrl}${video.poster}`,
      width: 720,
      height: 1280,
      alt: video.title,
    })),
    videos: videos.map((video) => ({
      url: `${baseUrl}${video.src}`,
      width: 720,
      height: 1280,
      type: "video/mp4",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Videos de procedimientos dentales | NOVACAD",
    description:
      "Mira los procedimientos del laboratorio dental NOVACAD en video: zirconia, E-max, PMMA y más.",
    images: [`${baseUrl}${videos[0].poster}`],
  },
};

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = match?.[1] ? parseInt(match[1], 10) : 0;
  const seconds = match?.[2] ? parseInt(match[2], 10) : 0;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function VideosPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Videos de procedimientos dentales NOVACAD",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/videos/${video.id}`,
      item: {
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: `${baseUrl}${video.poster}`,
        uploadDate: video.uploadDate,
        duration: video.duration,
        contentUrl: `${baseUrl}${video.src}`,
        inLanguage: "es-MX",
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemListLd} />
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main id="contenido" className="flex-1">
          <div className="site-container py-8 lg:py-12">
            <nav aria-label="Miga de pan" className="text-sm text-[#555555]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-brand-cyan hover:underline">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>→</li>
                <li aria-current="page" className="font-semibold text-black">
                  Videos
                </li>
              </ol>
            </nav>

            <h1 className="mt-4 text-[30px] font-bold leading-9 text-black lg:text-[32px] lg:leading-none">
              Videos de procedimientos
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-6 text-[#333333] lg:text-[17px]">
              Mira de cerca cómo trabajamos en el laboratorio: fresado, ajuste,
              pulido e impresión de restauraciones dentales.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {videos.map((video) => (
                <li key={video.id}>
                  <Link
                    href={`/videos/${video.id}`}
                    className="group block overflow-hidden rounded-[15px] border border-gray-200 bg-white transition-shadow hover:shadow-lg focus-visible:outline-brand-cyan"
                  >
                    <div className="relative aspect-9/16 w-full overflow-hidden bg-brand-soft">
                      <Image
                        src={video.poster}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute right-2 bottom-2 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                    <div className="p-3 lg:p-4">
                      <h2 className="line-clamp-2 text-sm leading-5 font-semibold text-black group-hover:text-brand-cyan lg:text-base lg:leading-6">
                        {video.title}
                      </h2>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
