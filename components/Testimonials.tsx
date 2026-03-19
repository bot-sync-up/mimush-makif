"use client";
import { useState } from "react";

type Testimonial = { name: string; location: string; text: string; amount: string };

export default function Testimonials({ data }: { data?: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const items = data ?? [];
  if (!items.length) return null;

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8FAFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", backgroundColor: "rgba(58,91,160,0.1)", color: "#3A5BA0", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "1rem" }}>לקוחות מרוצים</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>מה הלקוחות אומרים</h2>
          <p style={{ color: "#718096", fontSize: "1.1rem" }}>מאות לקוחות מרוצים שקיבלו את מה שמגיע להם</p>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "3rem", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20px", right: "30px", fontSize: "8rem", color: "#3A5BA0", opacity: 0.06, fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
          <div style={{ color: "#F7941D", fontSize: "1.5rem", marginBottom: "1.5rem" }}>★★★★★</div>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#2d3748", lineHeight: 1.8, marginBottom: "2rem", fontStyle: "italic" }}>
            "{items[active]?.text}"
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "700", fontSize: "20px" }}>
                {items[active]?.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: "700", color: "#1a2744" }}>{items[active]?.name}</div>
                <div style={{ color: "#718096", fontSize: "0.875rem" }}>{items[active]?.location}</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(247,148,29,0.1)", color: "#E85D20", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
              {items[active]?.amount}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "32px" : "10px", height: "10px", borderRadius: "5px", border: "none", cursor: "pointer", backgroundColor: i === active ? "#3A5BA0" : "#cbd5e0", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem" }}>
          {items.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ backgroundColor: i === active ? "#3A5BA0" : "white", border: i === active ? "2px solid #3A5BA0" : "2px solid #e2e8f0", borderRadius: "14px", padding: "0.875rem", cursor: "pointer", textAlign: "right", transition: "all 0.3s" }}>
              <div style={{ fontWeight: "700", fontSize: "14px", color: i === active ? "white" : "#1a2744", marginBottom: "4px" }}>{t.name}</div>
              <div style={{ fontSize: "12px", color: i === active ? "rgba(255,255,255,0.7)" : "#718096" }}>{t.amount}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
