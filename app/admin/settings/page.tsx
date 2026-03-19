"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Settings = { businessName: string; slogan: string; adminPassword: string };
type Contact = { phone: string; phoneHref: string; email: string; whatsappNumber: string; whatsappMessage: string };

export default function SettingsEditor() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [howItWorks, setHowItWorks] = useState<{ step: number; title: string; desc: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => {
      setSettings(c.settings);
      setContact(c.contact);
      setHowItWorks(c.howItWorks);
    });
  }, []);

  async function save() {
    setSaving(true);
    const content = await fetch("/api/content").then(r => r.json());
    // Update phone href and whatsapp href automatically
    const updatedContact = {
      ...contact,
      phoneHref: `tel:${contact?.phone?.replace(/-/g, "")}`,
    };
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...content, settings, contact: updatedContact, howItWorks }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!settings || !contact) return <AdminShell><div style={{ padding: "2rem", color: "#64748b" }}>טוען...</div></AdminShell>;

  return (
    <AdminShell>
      <div style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>⚙️ הגדרות</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>פרטי קשר, שם עסק, סיסמה</p>
          </div>
          <button onClick={save} disabled={saving} style={saveBtn(saved)}>
            {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור הכל"}
          </button>
        </div>

        {/* Business Info */}
        <div style={card}>
          <h3 style={sectionTitle}>🏢 פרטי העסק</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={label}>שם העסק</label>
              <input style={input} value={settings.businessName}
                onChange={e => setSettings({ ...settings, businessName: e.target.value })} />
            </div>
            <div>
              <label style={label}>סלוגן</label>
              <input style={input} value={settings.slogan}
                onChange={e => setSettings({ ...settings, slogan: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={card}>
          <h3 style={sectionTitle}>📞 פרטי קשר</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={label}>טלפון (לתצוגה)</label>
              <input style={input} value={contact.phone}
                onChange={e => setContact({ ...contact, phone: e.target.value })}
                placeholder="058-322-5747" dir="ltr" />
            </div>
            <div>
              <label style={label}>מספר וואטסאפ (972...)</label>
              <input style={input} value={contact.whatsappNumber}
                onChange={e => setContact({ ...contact, whatsappNumber: e.target.value })}
                placeholder="972533076696" dir="ltr" />
            </div>
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <label style={label}>אימייל</label>
            <input style={input} value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
              placeholder="email@example.com" dir="ltr" type="email" />
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <label style={label}>הודעת וואטסאפ ברירת מחדל</label>
            <input style={input} value={contact.whatsappMessage}
              onChange={e => setContact({ ...contact, whatsappMessage: e.target.value })} />
          </div>
        </div>

        {/* How it works */}
        <div style={card}>
          <h3 style={sectionTitle}>📋 איך זה עובד (3 שלבים)</h3>
          {howItWorks.map((step, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: "700", fontSize: "13px",
                }}>{step.step}</div>
                <span style={{ fontWeight: "600", color: "#374151" }}>שלב {step.step}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.75rem" }}>
                <div>
                  <label style={label}>כותרת</label>
                  <input style={input} value={step.title}
                    onChange={e => {
                      const next = [...howItWorks];
                      next[i] = { ...next[i], title: e.target.value };
                      setHowItWorks(next);
                    }} />
                </div>
                <div>
                  <label style={label}>תיאור</label>
                  <input style={input} value={step.desc}
                    onChange={e => {
                      const next = [...howItWorks];
                      next[i] = { ...next[i], desc: e.target.value };
                      setHowItWorks(next);
                    }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Password */}
        <div style={card}>
          <h3 style={sectionTitle}>🔐 סיסמת ניהול</h3>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={label}>סיסמה חדשה</label>
              <input
                type={showPass ? "text" : "password"}
                style={input}
                value={settings.adminPassword}
                onChange={e => setSettings({ ...settings, adminPassword: e.target.value })}
                dir="ltr"
              />
            </div>
            <button onClick={() => setShowPass(!showPass)}
              style={{ padding: "0.75rem 1rem", border: "2px solid #e2e8f0", borderRadius: "10px", background: "white", cursor: "pointer", marginBottom: "0.5rem", fontFamily: "Heebo, sans-serif" }}>
              {showPass ? "🙈 הסתר" : "👁️ הצג"}
            </button>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "12px" }}>⚠️ שנה סיסמה ושמור — התנתק ובדוק שהסיסמה החדשה עובדת</p>
        </div>

        {/* Backup */}
        <div style={card}>
          <h3 style={sectionTitle}>💾 ייצוא וגיבוי</h3>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            הורד את כל תוכן האתר כקובץ JSON. שמור אותו לגיבוי או לשחזור עתידי.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={async () => {
                const data = await fetch("/api/content").then(r => r.json());
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `content-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)", color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif", display: "flex", alignItems: "center", gap: "8px" }}
            >
              📥 הורד גיבוי (content.json)
            </button>
            <label style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", border: "2px solid #e2e8f0", background: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif", display: "flex", alignItems: "center", gap: "8px", color: "#374151" }}>
              📤 שחזר מגיבוי
              <input type="file" accept=".json" style={{ display: "none" }}
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (!confirm("זה ישחזר את כל תוכן האתר מהקובץ. להמשיך?")) return;
                  const text = await file.text();
                  const data = JSON.parse(text);
                  await fetch("/api/content", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  alert("התוכן שוחזר בהצלחה! רענן את הדף.");
                  e.target.value = "";
                }} />
            </label>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

const card: React.CSSProperties = { backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: "1.25rem" };
const sectionTitle: React.CSSProperties = { fontWeight: "800", color: "#1a2744", fontSize: "15px", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "2px solid #f1f5f9" };
const label: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const input: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", border: "2px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", fontFamily: "Heebo, sans-serif", direction: "rtl", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc" };
function saveBtn(saved: boolean): React.CSSProperties {
  return { padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", background: saved ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)", color: "white", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "Heebo, sans-serif" };
}
