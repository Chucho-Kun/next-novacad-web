import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { videos } from "@/data/videos";

const baseUrl = "https://novacad.com.mx";

type Props = {
  params: Promise<{ id: string }>;
};

function findVideo(id: string) {
  return videos.find((video) => video.id === id) ?? null;
}

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = findVideo(id);
  if (!video) return {};
  const canonical = `${baseUrl}/videos/${video.id}`;
  const thumbnailUrl = `${baseUrl}${video.poster}`;
  const contentUrl = `${baseUrl}${video.src}`;
  return {
    title: video.title,
    description: video.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      url: canonical,
      type: "website",
      locale: "es_MX",
      images: [
        {
          url: thumbnailUrl,
          width: 720,
          height: 1280,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: contentUrl,
          width: 720,
          height: 1280,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [thumbnailUrl],
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const video = findVideo(id);

  if (!video) notFound();

  const canonical = `${baseUrl}/videos/${video.id}`;
  const thumbnailUrl = `${baseUrl}${video.poster}`;
  const contentUrl = `${baseUrl}${video.src}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Videos",
        item: `${baseUrl}/videos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.title,
        item: canonical,
      },
    ],
  };

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl,
    inLanguage: "es-MX",
  };

  return (
    <>
      <JsonLd data={videoLd} />
      <JsonLd data={breadcrumbLd} />
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
                <li>
                  <Link href="/videos" className="hover:text-brand-cyan hover:underline">
                    Videos
                  </Link>
                </li>
                <li aria-hidden>→</li>
                <li aria-current="page" className="line-clamp-1 max-w-[40ch] font-semibold text-black">
                  {video.title}
                </li>
              </ol>
            </nav>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
              <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-105">
                <video
                  controls
                  preload="metadata"
                  poster={video.poster}
                  src={video.src}
                  className="aspect-9/16 w-full rounded-[15px] bg-black object-contain"
                >
                  Tu navegador no soporta el video.
                </video>
              </div>

              <div>
                <h1 className="text-[30px] font-bold leading-9 text-black lg:text-[32px] lg:leading-none">
                  {video.title}
                </h1>
                <p className="mt-4 text-base leading-6 text-[#333333] lg:text-[17px]">
                  {video.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/videos"
                    className="inline-flex min-h-11 items-center justify-center rounded-[10px] border-2 border-brand-deep bg-white px-6 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-light focus-visible:outline-brand-deep"
                  >
                    Ver todos los videos
                  </Link>
                  <a
                    href="https://wa.me/message/WGEHL6GIRQIVL1?src=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-cyan px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue focus-visible:outline-brand-cyan"
                  >
                    Agenda una cita
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
