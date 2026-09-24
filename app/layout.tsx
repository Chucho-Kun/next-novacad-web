import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
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
  title: "NOVACAD | Laboratorio Dental CAD/CAM - Prótesis Precisas",
  description:
    "Laboratorio dental con tecnología CAD/CAM. Prótesis de alta calidad: Zirconia, E-Max, PMMA, diseño de sonrisa. Innovación digital, sonrisa natural.",
  alternates: {
    canonical: "https://novacad.com.mx/",
  },
  openGraph: {
    title: "NOVACAD | Laboratorio Dental CAD/CAM - Prótesis Precisas",
    description:
      "Laboratorio dental con tecnología CAD/CAM. Prótesis de alta calidad: Zirconia, E-Max, PMMA, diseño de sonrisa. Innovación digital, sonrisa natural.",
    type: "website",
    locale: "es_MX",
    url: "https://novacad.com.mx/",
    images: [
      {
        url: "images/bg-logo-novacad-publish.jpg",
        width: 1200,
        height: 630,
        alt: "NOVACAD laboratorio dental CAD CAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVACAD | Laboratorio Dental CAD/CAM - Prótesis Precisas",
    description:
      "Laboratorio dental con tecnología CAD/CAM. Prótesis de alta calidad: Zirconia, E-Max, PMMA, diseño de sonrisa.",
    images: ["images/bg-logo-novacad-publish.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${montserrat.variable} ${agency.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
