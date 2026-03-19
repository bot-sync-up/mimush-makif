"use client";
import { useEffect, useRef } from "react";

type HeroData = { badge: string; title1: string; title2: string; title3: string; description: string; trustItems: string[] };
type ContactData = { phoneHref: string; whatsappNumber: string; whatsappMessage: string };

export default function HeroSection({ data, contact }: { data?: HeroData; contact?: ContactData }) {
  const heroRef = useRef<HTMLDivElement>(null);

  const hero = data ?? {
    badge: "ייעוץ ראשוני חינם ללא התחייבות",
    title1: "מיצוי זכויות", title2: "ממשלתיות", title3: "רק תיקח",
    description: "המדינה חייבת לך כסף — ואנחנו כאן כדי להוציא אותו.",
    trustItems: ["ללא סיכון", "תשלום בהצלחה בלבד", "ניסיון של 12 שנה"],
  };

  const phoneHref = contact?.phoneHref ?? "tel:0583225747";
  const waHref = `https://wa.me/${contact?.whatsappNumber ?? "972533076696"}?text=${encodeURIComponent(contact?.whatsappMessage ?? "שלום")}`;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a2744 0%, #3A5BA0 50%, #5B7EC9 100%)",
      display: "flex", alignItems: "center", position: "relative",
      overflow: "hidden", padding: "0 1.5rem",
    }}>
      <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(247,148,29,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-150px", right: "-150px", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(91,126,201,0.15)", pointerEvents: "none" }} />

      <div ref={heroRef} style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "100px", paddingBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(247,148,29,0.2)", borderRadius: "20px", padding: "6px 16px", marginBottom: "1.5rem" }}>
              <span style={{ color: "#F7941D", fontSize: "13px", fontWeight: "600" }}>✓ {hero.badge}</span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
              {hero.title1}<br />
              <span style={{ color: "#F7941D" }}>{hero.title2}</span><br />
              {hero.title3}
            </h1>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "500px" }}>
              {hero.description}
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={waHref} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#25D366", color: "white",
                padding: "1rem 1.75rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px",
                boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}>
                💬 שלח וואטסאפ
              </a>
              <a href={phoneHref} style={{
                display: "flex", alignItems: "center", gap: "8px", backgroundColor: "white", color: "#3A5BA0",
                padding: "1rem 1.75rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)", transition: "transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                📞 התקשר עכשיו
              </a>
              <a href="#contact-form" style={{
                display: "flex", alignItems: "center", gap: "8px",
                border: "2px solid rgba(255,255,255,0.5)", color: "white",
                padding: "1rem 1.75rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.backgroundColor = "transparent"; }}>
                📋 ייעוץ חינם
              </a>
            </div>

            <div style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {hero.trustItems.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                  <span style={{ color: "#F7941D", fontWeight: "700" }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div style={{ display: "flex", justifyContent: "center" }} className="hero-visual">
            <div style={{
              width: "360px", height: "360px", borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", border: "2px solid rgba(255,255,255,0.15)",
            }}>
              <div style={{
                width: "260px", height: "260px", borderRadius: "50%",
                background: "rgba(247,148,29,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid rgba(247,148,29,0.3)",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "80px", lineHeight: 1 }}>✅</div>
                  <div style={{ color: "white", fontWeight: "800", fontSize: "20px", marginTop: "12px" }}>מימוש מקיף</div>
                  <div style={{ color: "#F7941D", fontSize: "13px" }}>מיצוי זכויות ממשלתיות</div>
                </div>
              </div>
              {[
                { top: "20px", right: "-20px", text: "500+ לקוחות", icon: "👥" },
                { bottom: "40px", left: "-30px", text: "15M+ שקלים", icon: "💰" },
                { top: "50%", right: "-50px", text: "12 שנה", icon: "⭐" },
              ].map((badge, i) => (
                <div key={i} style={{
                  position: "absolute", top: badge.top, right: badge.right, bottom: badge.bottom, left: badge.left,
                  backgroundColor: "white", borderRadius: "12px", padding: "8px 14px",
                  display: "flex", alignItems: "center", gap: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)", fontSize: "13px", fontWeight: "700", color: "#1a2744", whiteSpace: "nowrap",
                }}>
                  <span>{badge.icon}</span><span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-visual { display: none !important; } }
      `}</style>
    </section>
  );
}
