import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { serviceCategories } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

function findService(slug: string) {
  for (const category of serviceCategories) {
    const item = category.items.find((s) => s.slug === slug);
    if (item) return item;
  }
  return null;
}

export function generateStaticParams() {
  return serviceCategories.flatMap((category) =>
    category.items.map((item) => ({ slug: item.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const canonical = `https://novacad.com.mx/servicios/${slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      type: "website",
      locale: "es_MX",
      images: [
        {
          url: "https://novacad.com.mx/images/bg-logo-novacad-publish.jpg",
          width: 1200,
          height: 630,
          alt: service.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["https://novacad.com.mx/images/bg-logo-novacad-publish.jpg"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) notFound();

  const canonical = `https://novacad.com.mx/servicios/${slug}`;
  const baseUrl = "https://novacad.com.mx";

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
        name: service.title,
        item: canonical,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: canonical,
    provider: {
      "@type": "Organization",
      name: "NOVACAD",
      url: `${baseUrl}/`,
    },
    areaServed: "MX",
    image: `${baseUrl}${service.image}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />
      <div className="flex min-h-screen flex-col bg-white">
      {/* Barra superior azul */}
      <div className="bg-brand-deep">
        <div className="mx-auto flex w-[90vw] items-center py-4 lg:w-[80vw] lg:py-5">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-white px-6 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-light focus-visible:outline-white lg:text-base"
          >
            Regresar
          </Link>
        </div>
      </div>

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto grid w-[90vw] gap-8 py-8 lg:w-[80vw] lg:grid-cols-[44%_1fr] lg:gap-12 lg:py-12">
          {/* Imagen */}
          <div className="order-1">
            <Image
              src={service.image}
              alt={service.alt}
              width={800}
              height={600}
              priority
              sizes="(max-width: 1024px) 90vw, 36vw"
              className="h-auto w-full rounded-[15px] object-cover"
            />
          </div>

          {/* Contenido */}
          <div className="order-2 flex flex-col">
            <h1 className="text-[30px] font-bold leading-9 text-black max-[479px]:text-[25px] max-[479px]:leading-7.5 lg:text-[32px] lg:leading-none">
              {service.title}
            </h1>

            <div className="mt-6 space-y-4 text-justify text-base leading-6 text-[#333333] lg:text-[17px] lg:leading-6">
              {service.intro.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/message/WGEHL6GIRQIVL1?src=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-brand-cyan px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-blue focus-visible:outline-brand-cyan"
              >
                Agenda una cita
              </a>
              <a
                href="https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border-2 border-brand-deep bg-white px-8 py-3 text-center text-base font-semibold text-brand-deep transition-colors hover:bg-brand-light focus-visible:outline-brand-deep"
              >
                Orden de trabajo
              </a>
            </div>

            {/* Categorías y etiquetas */}
            <div className="mt-8 space-y-2 border-t border-gray-200 pt-6 text-sm leading-5 text-[#555555]">
              <p>
                <span className="font-semibold text-black">Categorías:</span> {service.categories.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-black">Etiquetas:</span> {service.tags.join(", ")}
              </p>
            </div>

            {/* Ideal para */}
            <div className="mt-8">
              <h2 className="text-base font-semibold leading-6 text-black lg:text-[17px]">
                {service.idealForTitle}
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-6 text-[#333333] lg:text-[17px]">
                {service.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Características / Beneficios / Ventajas */}
            <div className="mt-8">
              <h2 className="text-base font-bold uppercase tracking-wide text-black lg:text-[17px]">
                {service.featuresTitle}
              </h2>
              <ul className="mt-3 space-y-2 text-base leading-6 text-[#333333] lg:text-[17px]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detalles de contacto */}
            <div className="mt-8 rounded-[10px] bg-brand-soft p-6">
              <h2 className="text-base font-bold uppercase tracking-wide text-black">
                Detalles de contacto
              </h2>
              <div className="mt-3 space-y-1 text-sm leading-5 text-[#333333]">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:novacad.social@gmail.com"
                    className="text-brand-cyan hover:text-brand-blue hover:underline"
                  >
                    novacad.social@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Dirección:</span> Cerezo 77A Boulevares Impala, Ecatepec de
                  Morelos, México, 55040
                </p>
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
