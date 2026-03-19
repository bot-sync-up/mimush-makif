"use client";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [content, setContent] = useState<Record<string, unknown[]>>({});

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(setContent);
  }, []);

  const sections = [
    { href: "/admin/announcement", icon: "📢", label: "סרגל הודעה", desc: "הפעל/כבה ועדוך את הסרגל העליון", color: "#F7941D" },
    { href: "/admin/popup", icon: "🪟", label: "פופ-אפ", desc: "חלון שמופיע אחרי X שניות לגולש", color: "#8b5cf6" },
    { href: "/admin/hero", icon: "🎯", label: "Hero / כותרת", desc: "ערוך את הכותרת הראשית, הסלוגן וכפתורי ה-CTA", color: "#3A5BA0" },
    { href: "/admin/stats", icon: "📊", label: "סטטיסטיקות", desc: `${(content.stats as unknown[])?.length ?? 0} מספרים מוצגים`, color: "#F7941D" },
    { href: "/admin/services", icon: "🛠️", label: "שירותים", desc: `${(content.services as unknown[])?.length ?? 0} שירותים פעילים`, color: "#10b981" },
    { href: "/admin/testimonials", icon: "💬", label: "עדויות לקוחות", desc: `${(content.testimonials as unknown[])?.length ?? 0} עדויות`, color: "#8b5cf6" },
    { href: "/admin/faq", icon: "❓", label: "שאלות נפוצות", desc: `${(content.faq as unknown[])?.length ?? 0} שאלות`, color: "#ef4444" },
    { href: "/admin/about", icon: "📖", label: "דף אודות", desc: "סיפור החברה, ערכים וצוות", color: "#3A5BA0" },
    { href: "/admin/submissions", icon: "📬", label: "פניות מהאתר", desc: "צפה בפניות שנשלחו מטופס הקשר", color: "#10b981" },
    { href: "/admin/seo", icon: "🔍", label: "SEO", desc: "כותרת, תיאור ו-Open Graph", color: "#64748b" },
    { href: "/admin/settings", icon: "⚙️", label: "הגדרות", desc: "פרטי קשר, סיסמה, שם עסק, גיבוי", color: "#64748b" },
  ];

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "#1a2744", marginBottom: "6px" }}>
          ברוך הבא 👋
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>
          ממשק ניהול תוכן — מימוש מקיף
        </p>
      </div>

      {/* Quick stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1rem", marginBottom: "2rem",
      }}>
        {[
          { label: "שירותים", value: (content.services as unknown[])?.length ?? 0, icon: "🛠️" },
          { label: "עדויות", value: (content.testimonials as unknown[])?.length ?? 0, icon: "💬" },
          { label: "שאלות FAQ", value: (content.faq as unknown[])?.length ?? 0, icon: "❓" },
          { label: "מספרים", value: (content.stats as unknown[])?.length ?? 0, icon: "📊" },
        ].map((s) => (
          <div key={s.label} style={{
            backgroundColor: "white", borderRadius: "16px",
            padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <span style={{ fontSize: "2rem" }}>{s.icon}</span>
            <div>
              <div style={{ fontWeight: "900", fontSize: "1.8rem", color: "#1a2744" }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: "13px" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <h2 style={{ fontWeight: "800", fontSize: "1.2rem", color: "#1a2744", marginBottom: "1rem" }}>
        עריכת תוכן
      </h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1rem",
      }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white", borderRadius: "16px",
              padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              display: "flex", alignItems: "center", gap: "1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer", border: "2px solid transparent",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
                el.style.borderColor = s.color;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                el.style.borderColor = "transparent";
              }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                backgroundColor: s.color + "20",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontWeight: "700", color: "#1a2744", marginBottom: "4px" }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>{s.desc}</div>
              </div>
              <div style={{ marginRight: "auto", color: "#94a3b8", fontSize: "18px" }}>←</div>
            </div>
          </Link>
        ))}
      </div>

      {/* View site link */}
      <div style={{
        marginTop: "2rem", padding: "1.5rem", backgroundColor: "#EBF4FF",
        borderRadius: "16px", display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <div style={{ fontWeight: "700", color: "#1a2744" }}>צפה באתר החי</div>
          <div style={{ color: "#64748b", fontSize: "13px" }}>כל שינוי נשמר מיד ומתעדכן באתר</div>
        </div>
        <Link href="/" target="_blank" style={{
          backgroundColor: "#3A5BA0", color: "white",
          padding: "0.75rem 1.5rem", borderRadius: "10px",
          textDecoration: "none", fontWeight: "700", fontSize: "14px",
        }}>
          🌐 פתח אתר
        </Link>
      </div>
    </AdminShell>
  );
}
