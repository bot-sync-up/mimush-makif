"use client";
import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FAQ({ data }: { data?: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = data ?? [];

  return (
    <section id="faq" style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", backgroundColor: "rgba(247,148,29,0.1)", color: "#E85D20", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "1rem" }}>שאלות ותשובות</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>שאלות נפוצות</h2>
          <p style={{ color: "#718096", fontSize: "1.1rem" }}>התשובות לשאלות שכולם שואלים</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item, i) => (
            <div key={i} style={{ borderRadius: "16px", border: open === i ? "2px solid #3A5BA0" : "2px solid #e2e8f0", overflow: "hidden", transition: "border-color 0.3s", backgroundColor: "white", boxShadow: open === i ? "0 4px 20px rgba(58,91,160,0.12)" : "none" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "right", gap: "1rem" }}>
                <span style={{ fontWeight: "700", fontSize: "1rem", color: open === i ? "#3A5BA0" : "#1a2744", flex: 1, textAlign: "right" }}>{item.q}</span>
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: open === i ? "#3A5BA0" : "#f0f4f8", color: open === i ? "white" : "#3A5BA0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "16px", transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.5rem", color: "#4a5568", fontSize: "0.975rem", lineHeight: 1.8 }}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
