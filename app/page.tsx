import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FloatingContact from "@/components/FloatingContact";
import WhyChoose from "@/components/WhyChoose";
import About from "@/components/About";
import Services from "@/components/Services";
import Gestiona from "@/components/Gestiona";
import ComoEmpacar from "@/components/ComoEmpacar";
import Procedimientos from "@/components/Procedimientos";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { serviceCategories } from "@/data/services";
import { faqs } from "@/data/faqs";

export default function Home() {
  const baseUrl = "https://novacad.com.mx";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOVACAD",
    url: `${baseUrl}/`,
    email: "novacad.social@gmail.com",
    telephone: "+525662682487",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cerezo 77A, Boulevares Impala",
      addressLocality: "Ecatepec de Morelos",
      addressRegion: "Estado de México",
      postalCode: "55040",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.5939938,
      longitude: -99.0385493,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    logo: `${baseUrl}/images/webp/bg-logo-novacad-publish.webp`,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61585583129527",
      "https://www.instagram.com/novacadental/",
      "https://www.tiktok.com/@novacad.dental",
    ],
    areaServed: ["Ecatepec de Morelos", "Ciudad de México", "Estado de México"],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NOVACAD | Laboratorio Dental CAD/CAM",
    url: `${baseUrl}/`,
    inLanguage: "es-MX",
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios NOVACAD",
    itemListElement: serviceCategories
      .flatMap((category) => category.items)
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${baseUrl}${item.href}`,
      })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <JsonLd data={itemListLd} />
      <JsonLd data={faqLd} />
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <FloatingContact />
        <main id="contenido" className="flex-1">
          <Hero />
          <Reveal>
            <WhyChoose />
          </Reveal>
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Services />
          </Reveal>
          <Reveal>
            <Gestiona />
          </Reveal>
          <Reveal>
            <ComoEmpacar />
          </Reveal>
          <Reveal>
            <Procedimientos />
          </Reveal>
          <Reveal>
            <Testimonials />
          </Reveal>
          {/* <Reveal>
            <Faq />
          </Reveal> */}
          <Reveal>
            <Contact />
          </Reveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
