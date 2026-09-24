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
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { serviceCategories } from "@/data/services";

export default function Home() {
  const baseUrl = "https://novacad.com.mx";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOVACAD",
    url: `${baseUrl}/`,
    email: "novacad.social@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cerezo 77A Boulevares Impala",
      postalCode: "55040",
      addressCountry: "MX",
    },
    logo: `${baseUrl}/images/bg-logo-novacad-publish.jpg`,
    sameAs: [],
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

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <JsonLd data={itemListLd} />
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <FloatingContact />
        <main className="flex-1">
          <Hero />
          <WhyChoose />
          <About />
          <Services />
          <Gestiona />
          <ComoEmpacar />
          <Procedimientos />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
