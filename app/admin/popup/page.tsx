"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type PopupData = {
  enabled: boolean;
  title: string;
  subtitle: string;
  text: string;
  delaySeconds: number;
};

const defaultData: PopupData = {
  enabled: true,
  title: "רגע לפני שאתה עוזב...",
  subtitle: "בדיקה חינם של הזכויות שלך",
  text: "אלפי אנשים מחמיצים קצבאות ופיצויים שמגיעים להם. הבדיקה שלנו חינמית ואין לה מה להפסיד.",
  delaySeconds: 10,
};

export default function PopupAdmin() {
  const [data, setData] = useState<PopupData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => {
      if (c.popup) setData(c.popup);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "popup", data }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function set(field: keyof PopupData, val: string | boolean | number) {
    setData(d => ({ ...d, [field]: val }));
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>🪟 חלון פופ-אפ</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>מופיע למבקר לאחר X שניות (פעם אחת לסשן)</p>
          </div>
          <button onClick={save} disabled={saving} style={btnStyle(saved ? "#10b981" : "#3A5BA0")}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
          </button>
        </div>

        {/* Preview */}
        <div style={{ marginBottom: "1.5rem", padding: "1.5rem", background: "linear-gradient(135deg, #1a274430, #3A5BA020)", borderRadius: "16px", border: "2px dashed #3A5BA040" }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "1rem" }}>תצוגה מקדימה של הפופ-אפ:</div>
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", maxWidth: "360px", margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎯</div>
            <h3 style={{ fontWeight: "900", color: "#1a2744", fontSize: "1.2rem", marginBottom: "0.25rem" }}>{data.title}</h3>
            <div style={{ color: "#F7941D", fontWeight: "700", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{data.subtitle}</div>
            <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.6, marginBottom: "1rem" }}>{data.text}</p>
            <div style={{ backgroundColor: "#25D366", color: "white", padding: "0.6rem", borderRadius: "8px", fontSize: "13px", fontWeight: "700" }}>💬 שלח הודעה בוואטסאפ</div>
          </div>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "2px solid #e2e8f0", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", backgroundColor: data.enabled ? "#F0FDF4" : "#FEF2F2", borderRadius: "12px", border: `1px solid ${data.enabled ? "#BBF7D0" : "#FECACA"}` }}>
            <div>
              <div style={{ fontWeight: "700", color: "#1a2744" }}>הצגת הפופ-אפ</div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>מציג פעם אחת לכל סשן לאחר ההשהיה</div>
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
                width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white",
                position: "absolute", top: "3px",
                right: data.enabled ? "3px" : "27px",
                transition: "right 0.3s",
              }} />
            </button>
          </div>

          {/* Delay */}
          <div>
            <label style={lbl}>השהיה לפני הופעה (שניות)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <input
                type="range" min="3" max="60" value={data.delaySeconds}
                onChange={e => set("delaySeconds", Number(e.target.value))}
                style={{ flex: 1, accentColor: "#3A5BA0" }}
              />
              <span style={{ minWidth: "50px", textAlign: "center", fontWeight: "700", color: "#1a2744", fontSize: "18px" }}>
                {data.delaySeconds}s
              </span>
            </div>
          </div>

          <div>
            <label style={lbl}>כותרת</label>
            <input style={inp} value={data.title} onChange={e => set("title", e.target.value)} />
          </div>

          <div>
            <label style={lbl}>תת-כותרת (כתום)</label>
            <input style={inp} value={data.subtitle} onChange={e => set("subtitle", e.target.value)} />
          </div>

          <div>
            <label style={lbl}>טקסט גוף</label>
            <textarea
              style={{ ...inp, minHeight: "80px", resize: "vertical" as const }}
              value={data.text}
              onChange={e => set("text", e.target.value)}
            />
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
