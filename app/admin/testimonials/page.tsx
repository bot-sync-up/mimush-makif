"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Testimonial = { name: string; location: string; text: string; amount: string };

export default function TestimonialsEditor() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => setItems(c.testimonials));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "testimonials", data: items }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(i: number, field: keyof Testimonial, val: string) {
    setItems(items.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  }

  function add() {
    setItems([...items, { name: "שם לקוח", location: "עיר", text: "עדות הלקוח...", amount: "סוג שירות" }]);
  }

  function remove(i: number) {
    if (!confirm("למחוק עדות זו?")) return;
    setItems(items.filter((_, idx) => idx !== i));
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>💬 עדויות לקוחות</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>{items.length} עדויות · מוצגות כקרוסלה</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={add} style={{ ...saveBtn(false), background: "linear-gradient(135deg, #10b981, #059669)" }}>+ הוסף עדות</button>
            <button onClick={save} disabled={saving} style={saveBtn(saved)}>
              {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
            </button>
          </div>
        </div>

        {items.map((t, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: "700", fontSize: "18px",
                }}>
                  {t.name[0] || "?"}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#1a2744" }}>{t.name}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>{t.location} · {t.amount}</div>
                </div>
              </div>
              <button onClick={() => remove(i)}
                style={{ background: "#FEE2E2", border: "none", color: "#DC2626", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontFamily: "Heebo, sans-serif" }}>
                מחק
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <label style={label}>שם</label>
                <input style={input} value={t.name} onChange={e => update(i, "name", e.target.value)} />
              </div>
              <div>
                <label style={label}>עיר / מיקום</label>
                <input style={input} value={t.location} onChange={e => update(i, "location", e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <label style={label}>שירות שניצל</label>
              <input style={input} value={t.amount} onChange={e => update(i, "amount", e.target.value)} placeholder="קצבת נכות / תאונות עבודה..." />
            </div>
            <div>
              <label style={label}>טקסט העדות</label>
              <textarea style={{ ...input, minHeight: "90px", resize: "vertical" as const }}
                value={t.text} onChange={e => update(i, "text", e.target.value)}
                placeholder="כתוב את טקסט העדות כאן..." />
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

const card: React.CSSProperties = {
  backgroundColor: "white", borderRadius: "16px", padding: "1.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "1rem",
  border: "1px solid #e2e8f0",
};
const label: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const input: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "2px solid #e2e8f0",
  borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif",
  direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc", marginBottom: "0",
};
function saveBtn(saved: boolean): React.CSSProperties {
  return {
    padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none",
    background: saved ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
    color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif",
  };
}
