"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type FaqItem = { q: string; a: string };

export default function FAQEditor() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => setItems(c.faq));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "faq", data: items }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(i: number, field: "q" | "a", val: string) {
    setItems(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }

  function add() {
    setItems([...items, { q: "שאלה חדשה?", a: "תשובה לשאלה..." }]);
  }

  function remove(i: number) {
    if (!confirm("למחוק שאלה זו?")) return;
    setItems(items.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>❓ שאלות נפוצות</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>{items.length} שאלות · ניתן לשנות סדר</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={add} style={{ ...saveBtn(false), background: "linear-gradient(135deg, #10b981, #059669)" }}>+ הוסף שאלה</button>
            <button onClick={save} disabled={saving} style={saveBtn(saved)}>
              {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
            </button>
          </div>
        </div>

        {items.map((item, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.75rem" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: "700", fontSize: "14px", flexShrink: 0,
              }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div>
                  <label style={label}>שאלה</label>
                  <input style={input} value={item.q} onChange={e => update(i, "q", e.target.value)} />
                </div>
                <div>
                  <label style={label}>תשובה</label>
                  <textarea style={{ ...input, minHeight: "80px", resize: "vertical" as const }}
                    value={item.a} onChange={e => update(i, "a", e.target.value)} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
                <button onClick={() => move(i, -1)} disabled={i === 0}
                  style={{ background: "#f1f5f9", border: "none", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", opacity: i === 0 ? 0.4 : 1 }}>
                  ▲
                </button>
                <button onClick={() => move(i, 1)} disabled={i === items.length - 1}
                  style={{ background: "#f1f5f9", border: "none", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", opacity: i === items.length - 1 ? 0.4 : 1 }}>
                  ▼
                </button>
                <button onClick={() => remove(i)}
                  style={{ background: "#FEE2E2", border: "none", color: "#DC2626", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

const card: React.CSSProperties = {
  backgroundColor: "white", borderRadius: "16px", padding: "1.25rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "0.75rem",
  border: "1px solid #e2e8f0",
};
const label: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "5px" };
const input: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "2px solid #e2e8f0",
  borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif",
  direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc", marginBottom: "0.5rem",
};
function saveBtn(saved: boolean): React.CSSProperties {
  return {
    padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none",
    background: saved ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
    color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif",
  };
}
