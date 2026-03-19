"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Stat = { value: number; suffix: string; label: string };

export default function StatsEditor() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => setStats(c.stats));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "stats", data: stats }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(i: number, field: keyof Stat, val: string | number) {
    const next = stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setStats(next);
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>📊 סטטיסטיקות</h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>הספרות הגדולות שמוצגות בפס הכחול</p>
          </div>
          <button onClick={save} disabled={saving} style={saveBtn(saved)}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור שינויים"}
          </button>
        </div>

        {stats.map((stat, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: "linear-gradient(135deg, #F7941D, #E85D20)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: "900", fontSize: "18px",
              }}>
                {i + 1}
              </div>
              <div style={{ fontWeight: "700", color: "#1a2744", fontSize: "16px" }}>
                תצוגה: <span style={{ color: "#F7941D", fontSize: "1.4rem" }}>{stat.value.toLocaleString()}{stat.suffix}</span>
                <span style={{ color: "#64748b", fontSize: "14px", display: "block", fontWeight: "500" }}>{stat.label}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 1fr", gap: "0.75rem" }}>
              <div>
                <label style={label}>ערך מספרי</label>
                <input type="number" style={input}
                  value={stat.value}
                  onChange={e => update(i, "value", Number(e.target.value))}
                />
              </div>
              <div>
                <label style={label}>סיומת</label>
                <input style={input} value={stat.suffix}
                  onChange={e => update(i, "suffix", e.target.value)}
                  placeholder="+ / M+"
                />
              </div>
              <div>
                <label style={label}>תווית</label>
                <input style={input} value={stat.label}
                  onChange={e => update(i, "label", e.target.value)}
                />
              </div>
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
};
const label: React.CSSProperties = {
  display: "block", fontSize: "13px", fontWeight: "600",
  color: "#374151", marginBottom: "6px",
};
const input: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "2px solid #e2e8f0",
  borderRadius: "10px", fontSize: "15px", fontFamily: "Heebo, sans-serif",
  direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc",
};
function saveBtn(saved: boolean): React.CSSProperties {
  return {
    padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none",
    background: saved ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
    color: "white", fontWeight: "700", fontSize: "15px",
    cursor: "pointer", fontFamily: "Heebo, sans-serif",
  };
}
