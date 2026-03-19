import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AnnouncementBar from "@/components/AnnouncementBar";
import PopupModal from "@/components/PopupModal";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const waHref = `https://wa.me/${content.contact?.whatsappNumber}?text=${encodeURIComponent(content.contact?.whatsappMessage ?? "שלום")}`;

  return (
    <>
      <AnnouncementBar data={content.announcementBar} />
      <Header />
      <main>
        <HeroSection data={content.hero} contact={content.contact} />
        <StatsCounter data={content.stats} />
        <ServicesGrid data={content.services} />
        <HowItWorks data={content.howItWorks} contact={content.contact} />
        <Testimonials data={content.testimonials} />
        <FAQ data={content.faq} />
        <ContactCTA contact={content.contact} services={content.services} />
      </main>
      <Footer contact={content.contact} settings={content.settings} />
      <FloatingWhatsApp contact={content.contact} />
      <PopupModal
        data={content.popup}
        waHref={waHref}
        phone={content.contact?.phone}
      />
    </>
  );
}
