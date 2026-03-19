"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type HeroData = {
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  description: string;
  trustItems: string[];
};

export default function HeroEditor() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => setData(c.hero));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "hero", data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!data) return <AdminShell><div style={{ padding: "2rem", color: "#64748b" }}>טוען...</div></AdminShell>;

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>🎯 Hero / כותרת ראשית</h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>עריכת הסעיף הראשי של דף הבית</p>
          </div>
          <button onClick={save} disabled={saving} style={saveBtn(saved)}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור שינויים"}
          </button>
        </div>

        <div style={card}>
          <h3 style={sectionTitle}>תגית עליונה (badge)</h3>
          <input style={input} value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} placeholder="ייעוץ ראשוני חינם..." />
        </div>

        <div style={card}>
          <h3 style={sectionTitle}>כותרת ראשית (3 שורות)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <label style={label}>שורה 1</label>
              <input style={input} value={data.title1} onChange={e => setData({ ...data, title1: e.target.value })} />
            </div>
            <div>
              <label style={label}>שורה 2 <span style={{ color: "#F7941D" }}>(בכתום)</span></label>
              <input style={input} value={data.title2} onChange={e => setData({ ...data, title2: e.target.value })} />
            </div>
            <div>
              <label style={label}>שורה 3</label>
              <input style={input} value={data.title3} onChange={e => setData({ ...data, title3: e.target.value })} />
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#1a2744", borderRadius: "12px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginBottom: "6px" }}>תצוגה מקדימה</p>
            <div style={{ color: "white", fontWeight: "900", fontSize: "1.4rem", lineHeight: 1.4 }}>
              {data.title1}<br />
              <span style={{ color: "#F7941D" }}>{data.title2}</span><br />
              {data.title3}
            </div>
          </div>
        </div>

        <div style={card}>
          <h3 style={sectionTitle}>תיאור / תת-כותרת</h3>
          <textarea style={{ ...input, minHeight: "100px", resize: "vertical" as const }}
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div style={card}>
          <h3 style={sectionTitle}>פריטי אמון (3 טקסטים)</h3>
          {data.trustItems.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
              <span style={{ color: "#F7941D", fontWeight: "700", flexShrink: 0 }}>✓</span>
              <input
                style={{ ...input, marginBottom: 0 }}
                value={item}
                onChange={e => {
                  const newItems = [...data.trustItems];
                  newItems[i] = e.target.value;
                  setData({ ...data, trustItems: newItems });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

const card: React.CSSProperties = {
  backgroundColor: "white", borderRadius: "16px", padding: "1.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "1.25rem",
};
const sectionTitle: React.CSSProperties = {
  fontWeight: "800", color: "#1a2744", fontSize: "15px",
  marginBottom: "1rem", paddingBottom: "0.75rem",
  borderBottom: "2px solid #f1f5f9",
};
const label: React.CSSProperties = {
  display: "block", fontSize: "13px", fontWeight: "600",
  color: "#374151", marginBottom: "6px",
};
const input: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem",
  border: "2px solid #e2e8f0", borderRadius: "10px",
  fontSize: "15px", fontFamily: "Heebo, sans-serif",
  direction: "rtl", outline: "none", boxSizing: "border-box",
  marginBottom: "0.5rem", backgroundColor: "#f8fafc",
};
function saveBtn(saved: boolean): React.CSSProperties {
  return {
    padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none",
    background: saved ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
    color: "white", fontWeight: "700", fontSize: "15px",
    cursor: "pointer", fontFamily: "Heebo, sans-serif",
    transition: "all 0.3s",
  };
}
