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

export default function Home() {
  return (
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
  );
}
