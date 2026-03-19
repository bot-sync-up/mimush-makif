"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Value = { icon: string; title: string; text: string };
type AboutData = {
  story: string;
  mission: string;
  values: Value[];
  teamTitle: string;
  teamText: string;
};

const defaultData: AboutData = {
  story: "",
  mission: "",
  values: [],
  teamTitle: "הצוות שלנו",
  teamText: "",
};

const VALUE_ICONS = ["💎", "🤝", "⚡", "🏆", "🎯", "💡", "🛡️", "❤️", "🌟"];

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => {
      if (c.about) setData(c.about);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "about", data }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function set(field: keyof AboutData, val: string | Value[]) {
    setData(d => ({ ...d, [field]: val }));
  }

  function updateValue(i: number, field: keyof Value, val: string) {
    setData(d => ({
      ...d,
      values: d.values.map((v, idx) => idx === i ? { ...v, [field]: val } : v),
    }));
  }

  function addValue() {
    setData(d => ({ ...d, values: [...d.values, { icon: "💎", title: "ערך חדש", text: "תיאור הערך..." }] }));
  }

  function removeValue(i: number) {
    setData(d => ({ ...d, values: d.values.filter((_, idx) => idx !== i) }));
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>📖 דף אודות</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>סיפור החברה, ערכים וצוות</p>
          </div>
          <button onClick={save} disabled={saving} style={btnStyle(saved ? "#10b981" : "#3A5BA0")}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Story */}
          <div style={card}>
            <h2 style={sectionTitle}>📝 סיפור החברה</h2>
            <div>
              <label style={lbl}>פסקת סיפור</label>
              <textarea style={{ ...inp, minHeight: "120px", resize: "vertical" as const }}
                value={data.story} onChange={e => set("story", e.target.value)} />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={lbl}>המשימה שלנו</label>
              <textarea style={{ ...inp, minHeight: "80px", resize: "vertical" as const }}
                value={data.mission} onChange={e => set("mission", e.target.value)} />
            </div>
          </div>

          {/* Values */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ ...sectionTitle, marginBottom: 0 }}>💎 ערכי החברה</h2>
              <button onClick={addValue} style={btnStyle("#10b981")}>+ הוסף ערך</button>
            </div>
            {data.values.map((v, i) => (
              <div key={i} style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "1rem", marginBottom: "0.75rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "0.75rem", alignItems: "end" }}>
                  <div>
                    <label style={lbl}>אייקון</label>
                    <select style={inp} value={v.icon} onChange={e => updateValue(i, "icon", e.target.value)}>
                      {VALUE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>כותרת</label>
                    <input style={inp} value={v.title} onChange={e => updateValue(i, "title", e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                    <div style={{ flex: 1 }}>
                      <label style={lbl}>תיאור</label>
                      <input style={inp} value={v.text} onChange={e => updateValue(i, "text", e.target.value)} />
                    </div>
                    <button onClick={() => removeValue(i)}
                      style={{ background: "#FEE2E2", border: "none", color: "#DC2626", padding: "0 12px", borderRadius: "8px", cursor: "pointer", height: "42px", fontSize: "14px", fontFamily: "Heebo, sans-serif", flexShrink: 0 }}>
                      מחק
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <div style={card}>
            <h2 style={sectionTitle}>👥 הצוות</h2>
            <div>
              <label style={lbl}>כותרת מקטע הצוות</label>
              <input style={inp} value={data.teamTitle} onChange={e => set("teamTitle", e.target.value)} />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={lbl}>טקסט תיאור הצוות</label>
              <textarea style={{ ...inp, minHeight: "80px", resize: "vertical" as const }}
                value={data.teamText} onChange={e => set("teamText", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

const card: React.CSSProperties = { backgroundColor: "white", borderRadius: "16px", border: "2px solid #e2e8f0", padding: "1.5rem" };
const sectionTitle: React.CSSProperties = { fontSize: "1.1rem", fontWeight: "800", color: "#1a2744", marginBottom: "1.25rem" };
const lbl: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "5px" };
const inp: React.CSSProperties = { width: "100%", padding: "0.7rem 0.9rem", border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif", direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc" };
function btnStyle(bg: string): React.CSSProperties {
  return { padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", background: `linear-gradient(135deg, ${bg}, ${bg}cc)`, color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif", whiteSpace: "nowrap" };
}
