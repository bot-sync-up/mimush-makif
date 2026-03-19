import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Service = { id: string; icon: string; title: string; shortDesc: string; fullDesc: string; bullets: string[] };

export default function ServicesPage() {
  const content = getContent();
  const services: Service[] = content.services ?? [];
  const contact = content.contact;

  const waHref = `https://wa.me/${contact?.whatsappNumber}?text=${encodeURIComponent(contact?.whatsappMessage ?? "שלום")}`;

  return (
    <>
      <Header />
      <FloatingWhatsApp contact={contact} />

      <section style={{ background: "linear-gradient(135deg, #1a2744 0%, #3A5BA0 100%)", padding: "10rem 1.5rem 5rem", textAlign: "center" }}>
        <h1 style={{ color: "white", fontWeight: "900", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>השירותים שלנו</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto" }}>מיצוי מקיף של כל הזכויות שמגיעות לך מהמדינה והביטוח הלאומי</p>
      </section>

      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8FAFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
          {services.map((service, index) => (
            <div key={service.id} id={service.id} style={{
              backgroundColor: "white", borderRadius: "24px", padding: "3rem",
              boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
              display: "grid", gridTemplateColumns: index % 2 === 0 ? "1fr 2fr" : "2fr 1fr",
              gap: "3rem", alignItems: "center",
            }} className="service-card">
              <div style={{ order: index % 2 === 0 ? 0 : 1 }} className="service-icon-side">
                <div style={{
                  width: "120px", height: "120px", borderRadius: "30px",
                  background: index % 2 === 0 ? "linear-gradient(135deg, #3A5BA0, #5B7EC9)" : "linear-gradient(135deg, #F7941D, #E85D20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "4rem", margin: "0 auto", boxShadow: "0 10px 40px rgba(58,91,160,0.25)",
                }}>{service.icon}</div>
              </div>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>{service.title}</h2>
                <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{service.fullDesc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
                  {service.bullets.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4a5568", fontSize: "0.95rem" }}>
                      <span style={{ color: "#F7941D", fontWeight: "700", fontSize: "16px" }}>✓</span>{b}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "white", padding: "0.875rem 1.5rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>💬 שלח וואטסאפ</a>
                  <a href={contact?.phoneHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EBF4FF", color: "#3A5BA0", padding: "0.875rem 1.5rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>📞 התקשר</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer contact={contact} settings={content.settings} />
      <style>{`@media (max-width: 768px) { .service-card { grid-template-columns: 1fr !important; } .service-icon-side { order: -1 !important; } }`}</style>
    </>
  );
}
