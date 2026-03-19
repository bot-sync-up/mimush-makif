"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type AnnouncementBar = {
  enabled: boolean;
  text: string;
  link: string;
  linkText: string;
  bgColor: string;
  textColor: string;
};

const defaultData: AnnouncementBar = {
  enabled: true,
  text: "🎯 ייעוץ ראשוני חינם לחלוטין — ללא התחייבות!",
  link: "",
  linkText: "",
  bgColor: "#1a2744",
  textColor: "#ffffff",
};

export default function AnnouncementAdmin() {
  const [data, setData] = useState<AnnouncementBar>(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => {
      if (c.announcementBar) setData(c.announcementBar);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "announcementBar", data }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function set(field: keyof AnnouncementBar, val: string | boolean) {
    setData(d => ({ ...d, [field]: val }));
  }

  const previewStyle = {
    backgroundColor: data.bgColor,
    color: data.textColor,
    padding: "10px 2rem",
    textAlign: "center" as const,
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "10px",
    marginBottom: "1.5rem",
    position: "relative" as const,
  };

  return (
    <AdminShell>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>📢 סרגל הודעה עליון</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>מופיע מעל ה-Header באתר</p>
          </div>
          <button onClick={save} disabled={saving} style={btnStyle(saved ? "#10b981" : "#3A5BA0")}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
          </button>
        </div>

        {/* Preview */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>תצוגה מקדימה:</div>
          <div style={previewStyle}>
            {data.text}
            {data.link && data.linkText && (
              <span style={{ color: "#F7941D", marginRight: "8px", textDecoration: "underline" }}>{data.linkText}</span>
            )}
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.6 }}>×</span>
          </div>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "2px solid #e2e8f0", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", backgroundColor: data.enabled ? "#F0FDF4" : "#FEF2F2", borderRadius: "12px", border: `1px solid ${data.enabled ? "#BBF7D0" : "#FECACA"}` }}>
            <div>
              <div style={{ fontWeight: "700", color: "#1a2744" }}>הצגת הסרגל</div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>הפעל או כבה את סרגל ההודעה</div>
            </div>
            <button
              onClick={() => set("enabled", !data.enabled)}
              style={{
                width: "52px", height: "28px", borderRadius: "14px",
                backgroundColor: data.enabled ? "#10b981" : "#cbd5e1",
                border: "none", cursor: "pointer", position: "relative", transition: "all 0.3s",
              }}
            >
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute", top: "3px",
                right: data.enabled ? "3px" : "27px",
                transition: "right 0.3s",
              }} />
            </button>
          </div>

          {/* Text */}
          <div>
            <label style={lbl}>טקסט ההודעה</label>
            <input style={inp} value={data.text} onChange={e => set("text", e.target.value)} placeholder="הכנס טקסט להודעה..." />
          </div>

          {/* Link */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={lbl}>קישור (אופציונלי)</label>
              <input style={inp} value={data.link} onChange={e => set("link", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={lbl}>טקסט הקישור</label>
              <input style={inp} value={data.linkText} onChange={e => set("linkText", e.target.value)} placeholder="לחץ כאן" />
            </div>
          </div>

          {/* Colors */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={lbl}>צבע רקע</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={data.bgColor} onChange={e => set("bgColor", e.target.value)}
                  style={{ width: "44px", height: "44px", border: "2px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", padding: "2px" }} />
                <input style={{ ...inp, flex: 1 }} value={data.bgColor} onChange={e => set("bgColor", e.target.value)} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                {["#1a2744", "#3A5BA0", "#F7941D", "#10b981", "#DC2626", "#000000"].map(c => (
                  <button key={c} onClick={() => set("bgColor", c)}
                    style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: c, border: data.bgColor === c ? "2px solid #1a2744" : "2px solid transparent", cursor: "pointer" }} />
                ))}
              </div>
            </div>
            <div>
              <label style={lbl}>צבע טקסט</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={data.textColor} onChange={e => set("textColor", e.target.value)}
                  style={{ width: "44px", height: "44px", border: "2px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", padding: "2px" }} />
                <input style={{ ...inp, flex: 1 }} value={data.textColor} onChange={e => set("textColor", e.target.value)} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                {["#ffffff", "#1a2744", "#F7941D", "#000000"].map(c => (
                  <button key={c} onClick={() => set("textColor", c)}
                    style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: c, border: data.textColor === c ? "2px solid #1a2744" : "2px solid transparent", cursor: "pointer" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

const lbl: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "5px" };
const inp: React.CSSProperties = { width: "100%", padding: "0.7rem 0.9rem", border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif", direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc" };
function btnStyle(bg: string): React.CSSProperties {
  return { padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", background: `linear-gradient(135deg, ${bg}, ${bg}cc)`, color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif" };
}
