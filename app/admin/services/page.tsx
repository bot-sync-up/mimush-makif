"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Service = {
  id: string; icon: string; title: string;
  shortDesc: string; fullDesc: string; bullets: string[];
};

const ICONS = ["♿", "🏥", "👴", "💼", "⚖️", "🏛️", "💊", "🦽", "👩‍⚕️", "📋"];

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(c => setServices(c.services));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "services", data: services }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateService(i: number, field: keyof Service, val: string | string[]) {
    setServices(services.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  function updateBullet(si: number, bi: number, val: string) {
    const bullets = [...services[si].bullets];
    bullets[bi] = val;
    updateService(si, "bullets", bullets);
  }

  function addBullet(si: number) {
    updateService(si, "bullets", [...services[si].bullets, "פריט חדש"]);
  }

  function removeBullet(si: number, bi: number) {
    updateService(si, "bullets", services[si].bullets.filter((_, i) => i !== bi));
  }

  function addService() {
    const newS: Service = {
      id: `service-${Date.now()}`, icon: "💼",
      title: "שירות חדש", shortDesc: "תיאור קצר",
      fullDesc: "תיאור מלא", bullets: ["פריט 1"],
    };
    setServices([...services, newS]);
    setEditIndex(services.length);
  }

  function removeService(i: number) {
    if (!confirm("האם למחוק שירות זה?")) return;
    setServices(services.filter((_, idx) => idx !== i));
    setEditIndex(null);
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>🛠️ שירותים</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>ניהול השירותים המוצגים באתר</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={addService} style={{ ...saveBtn(false), background: "linear-gradient(135deg, #10b981, #059669)" }}>
              + הוסף שירות
            </button>
            <button onClick={save} disabled={saving} style={saveBtn(saved)}>
              {saving ? "שומר..." : saved ? "✓ נשמר!" : "💾 שמור"}
            </button>
          </div>
        </div>

        {/* Services list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {services.map((service, i) => (
            <div key={service.id} style={{
              backgroundColor: "white", borderRadius: "16px",
              border: editIndex === i ? "2px solid #3A5BA0" : "2px solid #e2e8f0",
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 1.25rem", cursor: "pointer",
                backgroundColor: editIndex === i ? "#EBF4FF" : "white",
              }}
                onClick={() => setEditIndex(editIndex === i ? null : i)}>
                <span style={{ fontSize: "2rem" }}>{service.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", color: "#1a2744" }}>{service.title}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>{service.shortDesc}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={(e) => { e.stopPropagation(); removeService(i); }}
                    style={{ background: "#FEE2E2", border: "none", color: "#DC2626", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontFamily: "Heebo, sans-serif" }}>
                    מחק
                  </button>
                  <span style={{ color: "#94a3b8", fontSize: "20px" }}>{editIndex === i ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Edit form */}
              {editIndex === i && (
                <div style={{ padding: "1.25rem", borderTop: "2px solid #e2e8f0" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={label}>אייקון</label>
                      <select style={input} value={service.icon} onChange={e => updateService(i, "icon", e.target.value)}>
                        {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={label}>כותרת</label>
                      <input style={input} value={service.title} onChange={e => updateService(i, "title", e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={label}>תיאור קצר (בכרטיס)</label>
                    <input style={input} value={service.shortDesc} onChange={e => updateService(i, "shortDesc", e.target.value)} />
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={label}>תיאור מלא (בדף שירותים)</label>
                    <textarea style={{ ...input, minHeight: "90px", resize: "vertical" as const }}
                      value={service.fullDesc} onChange={e => updateService(i, "fullDesc", e.target.value)} />
                  </div>
                  <div>
                    <label style={label}>נקודות בולט</label>
                    {service.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <input style={{ ...input, marginBottom: 0 }} value={b}
                          onChange={e => updateBullet(i, bi, e.target.value)} />
                        <button onClick={() => removeBullet(i, bi)}
                          style={{ background: "#FEE2E2", border: "none", color: "#DC2626", padding: "0 12px", borderRadius: "8px", cursor: "pointer", flexShrink: 0 }}>
                          ✕
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addBullet(i)}
                      style={{ background: "#EBF4FF", border: "none", color: "#3A5BA0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "Heebo, sans-serif" }}>
                      + הוסף נקודה
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

const label: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
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
