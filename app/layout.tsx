import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const agency = localFont({
  src: "./fonts/agencyb.ttf",
  variable: "--font-agency",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novacad.com.mx/"),
  title: "NOVACAD | Laboratorio Dental en Ecatepec | CAD/CAM",
  description:
    "Laboratorio dental CAD/CAM en Ecatepec para odontólogos de CDMX y Edomex: zirconia, E-max, PMMA y diseño de sonrisa.",
  alternates: {
    canonical: "https://novacad.com.mx/",
  },
  openGraph: {
    title: "NOVACAD | Laboratorio Dental en Ecatepec | CAD/CAM",
    description:
      "Laboratorio dental CAD/CAM en Ecatepec para odontólogos de CDMX y Edomex: zirconia, E-max, PMMA y diseño de sonrisa.",
    type: "website",
    locale: "es_MX",
    url: "https://novacad.com.mx/",
    images: [
      {
        url: "https://novacad.com.mx/images/webp/bg-logo-novacad-publish.webp",
        width: 1200,
        height: 630,
        alt: "NOVACAD laboratorio dental CAD CAM en Ecatepec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVACAD | Laboratorio Dental en Ecatepec | CAD/CAM",
    description:
      "Laboratorio dental CAD/CAM en Ecatepec para odontólogos de CDMX y Edomex: zirconia, E-max, PMMA y diseño de sonrisa.",
    images: ["https://novacad.com.mx/images/webp/bg-logo-novacad-publish.webp"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="es-MX" className={`${montserrat.variable} ${agency.variable} h-full antialiased`}>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
