"use client";
import Link from "next/link";

type Service = { id: string; icon: string; title: string; shortDesc: string; fullDesc: string; bullets: string[] };

export default function ServicesGrid({ data }: { data?: Service[] }) {
  const services = data ?? [];

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8FAFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", backgroundColor: "rgba(58,91,160,0.1)", color: "#3A5BA0", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "1rem" }}>
            השירותים שלנו
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>מה אנחנו מציעים</h2>
          <p style={{ color: "#718096", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>אנו מתמחים במגוון תחומי מיצוי זכויות מהביטוח הלאומי ומהמדינה</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {services.map((service, index) => (
            <div key={service.id} style={{
              backgroundColor: "white", borderRadius: "20px", padding: "2rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid rgba(58,91,160,0.08)",
              transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(58,91,160,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}>
              <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: "4px", background: index % 2 === 0 ? "linear-gradient(90deg, #3A5BA0, #5B7EC9)" : "linear-gradient(90deg, #F7941D, #E85D20)" }} />
              <div style={{ fontSize: "3rem", marginBottom: "1rem", lineHeight: 1 }}>{service.icon}</div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#1a2744", marginBottom: "0.75rem" }}>{service.title}</h3>
              <p style={{ color: "#718096", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{service.shortDesc}</p>
              <Link href={`/services#${service.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#3A5BA0", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
                קרא עוד ←
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
