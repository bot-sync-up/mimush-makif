"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type SeoData = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
};

const defaultData: SeoData = {
  title: "מימוש מקיף | מיצוי זכויות ממשלתיות",
  description: "מימוש מקיף — מומחים למיצוי זכויות מביטוח לאומי. קצבת נכות, תאונות עבודה, קצבת זקנה. ייעוץ ראשוני חינם, תשלום רק בהצלחה.",
  keywords: "ביטוח לאומי, מיצוי זכויות, קצבת נכות, תאונות עבודה, קצבת זקנה",
  ogTitle: "מימוש מקיף | מיצוי זכויות ממשלתיות",
  ogDescription: "המדינה חייבת לך כסף — ואנחנו כאן כדי להוציא אותו.",
};

export default function SeoAdmin() {
  const [data, setData] = useState<SeoData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => {
      if (c.seo) setData({ ...defaultData, ...c.seo });
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "seo", data }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function set(field: keyof SeoData, val: string) {
    setData(d => ({ ...d, [field]: val }));
  }

  const titleLen = data.title.length;
  const descLen = data.description.length;

  return (
    <AdminShell>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>🔍 הגדרות SEO</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>כותרת, תיאור ונתוני Open Graph לשיתוף</p>
          </div>
          <button onClick={save} disabled={saving} style={btnStyle(saved ? "#10b981" : "#3A5BA0")}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
          </button>
        </div>

        {/* Google Preview */}
        <div style={{ marginBottom: "1.5rem", padding: "1.25rem", backgroundColor: "white", borderRadius: "12px", border: "2px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>תצוגה מקדימה בגוגל:</div>
          <div style={{ fontSize: "12px", color: "#202124", marginBottom: "2px" }}>https://www.mimush-makif.co.il</div>
          <div style={{ fontSize: "18px", color: "#1a0dab", fontWeight: "400", marginBottom: "4px", lineHeight: 1.3 }}>{data.title || "כותרת העמוד"}</div>
          <div style={{ fontSize: "13px", color: "#4d5156", lineHeight: 1.5 }}>{data.description || "תיאור העמוד..."}</div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "2px solid #e2e8f0", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Title */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <label style={lbl}>כותרת הדף (Title Tag)</label>
              <span style={{ fontSize: "12px", color: titleLen > 60 ? "#DC2626" : titleLen > 50 ? "#F7941D" : "#10b981" }}>
                {titleLen}/60
              </span>
            </div>
            <input style={inp} value={data.title} onChange={e => set("title", e.target.value)} placeholder="מימוש מקיף | מיצוי זכויות ממשלתיות" />
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>מומלץ: עד 60 תווים</div>
          </div>

          {/* Description */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <label style={lbl}>תיאור (Meta Description)</label>
              <span style={{ fontSize: "12px", color: descLen > 160 ? "#DC2626" : descLen > 140 ? "#F7941D" : "#10b981" }}>
                {descLen}/160
              </span>
            </div>
            <textarea style={{ ...inp, minHeight: "80px", resize: "vertical" as const }}
              value={data.description} onChange={e => set("description", e.target.value)}
              placeholder="תיאור קצר ומושך של האתר..." />
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>מומלץ: 140–160 תווים</div>
          </div>

          {/* Keywords */}
          <div>
            <label style={lbl}>מילות מפתח (Keywords)</label>
            <input style={inp} value={data.keywords} onChange={e => set("keywords", e.target.value)}
              placeholder="ביטוח לאומי, מיצוי זכויות, קצבת נכות" />
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>מופרדים בפסיק</div>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem" }}>
            <h3 style={{ fontWeight: "700", color: "#1a2744", marginBottom: "1rem", fontSize: "14px" }}>📤 Open Graph (שיתוף ברשתות חברתיות)</h3>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={lbl}>כותרת OG</label>
              <input style={inp} value={data.ogTitle} onChange={e => set("ogTitle", e.target.value)} />
            </div>

            <div>
              <label style={lbl}>תיאור OG</label>
              <textarea style={{ ...inp, minHeight: "70px", resize: "vertical" as const }}
                value={data.ogDescription} onChange={e => set("ogDescription", e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#FFF8F0", borderRadius: "12px", border: "1px solid #FDDCB5", fontSize: "13px", color: "#92400e" }}>
          💡 <strong>שים לב:</strong> שינויי SEO עלולים לקחת כמה ימים להופיע בתוצאות חיפוש
        </div>
      </div>
    </AdminShell>
  );
}

const lbl: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "0" };
const inp: React.CSSProperties = { width: "100%", padding: "0.7rem 0.9rem", border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif", direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc" };
function btnStyle(bg: string): React.CSSProperties {
  return { padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", background: `linear-gradient(135deg, ${bg}, ${bg}cc)`, color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif" };
}
