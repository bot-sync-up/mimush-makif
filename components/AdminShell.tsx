"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", icon: "🏠", label: "דשבורד" },
  { href: "/admin/announcement", icon: "📢", label: "סרגל הודעה" },
  { href: "/admin/popup", icon: "🪟", label: "פופ-אפ" },
  { href: "/admin/hero", icon: "🎯", label: "Hero / כותרת" },
  { href: "/admin/stats", icon: "📊", label: "סטטיסטיקות" },
  { href: "/admin/services", icon: "🛠️", label: "שירותים" },
  { href: "/admin/testimonials", icon: "💬", label: "עדויות" },
  { href: "/admin/faq", icon: "❓", label: "שאלות נפוצות" },
  { href: "/admin/about", icon: "📖", label: "דף אודות" },
  { href: "/admin/submissions", icon: "📬", label: "פניות" },
  { href: "/admin/seo", icon: "🔍", label: "SEO" },
  { href: "/admin/settings", icon: "⚙️", label: "הגדרות" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  }

  const sidebarWidth = sidebarOpen ? "240px" : "72px";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth, flexShrink: 0,
        backgroundColor: "#1a2744",
        display: "flex", flexDirection: "column",
        transition: "width 0.3s",
        position: "fixed", top: 0, right: 0, bottom: 0,
        zIndex: 50, overflowY: "auto", overflowX: "hidden",
      }}>
        {/* Logo area */}
        <div style={{
          padding: sidebarOpen ? "1.5rem" : "1.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center",
          gap: "12px", flexShrink: 0,
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #F7941D, #E85D20)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "900", fontSize: "16px", flexShrink: 0,
          }}>✓</div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ color: "white", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>
                מימוש מקיף
              </div>
              <div style={{ color: "#F7941D", fontSize: "11px" }}>ניהול תוכן</div>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: "rgba(255,255,255,0.05)", border: "none",
            color: "#94a3b8", padding: "0.75rem",
            cursor: "pointer", textAlign: "center",
            fontSize: "18px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
          title={sidebarOpen ? "כווץ תפריט" : "הרחב תפריט"}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0" }}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!sidebarOpen ? item.label : undefined}
                style={{
                  display: "flex", alignItems: "center",
                  gap: "12px",
                  padding: sidebarOpen ? "0.75rem 1.25rem" : "0.75rem",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  textDecoration: "none",
                  backgroundColor: active ? "rgba(247,148,29,0.15)" : "transparent",
                  borderRight: active ? "3px solid #F7941D" : "3px solid transparent",
                  transition: "all 0.2s",
                  margin: "2px 0",
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && (
                  <span style={{
                    color: active ? "#F7941D" : "#94a3b8",
                    fontWeight: active ? "700" : "500",
                    fontSize: "14px", whiteSpace: "nowrap",
                  }}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem" }}>
          <Link
            href="/"
            target="_blank"
            title={!sidebarOpen ? "צפה באתר" : undefined}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "0.6rem 0.75rem", borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",
              textDecoration: "none", marginBottom: "6px",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
          >
            <span style={{ fontSize: "16px" }}>🌐</span>
            {sidebarOpen && <span style={{ color: "#94a3b8", fontSize: "13px" }}>צפה באתר</span>}
          </Link>
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "התנתק" : undefined}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "0.6rem 0.75rem", borderRadius: "10px",
              backgroundColor: "rgba(239,68,68,0.1)", border: "none",
              cursor: "pointer", fontFamily: "Heebo, sans-serif",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
          >
            <span style={{ fontSize: "16px" }}>🚪</span>
            {sidebarOpen && <span style={{ color: "#f87171", fontSize: "13px" }}>התנתק</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{
        marginRight: sidebarWidth, flex: 1,
        padding: "2rem", transition: "margin-right 0.3s",
        minHeight: "100vh",
      }}>
        {children}
      </main>
    </div>
  );
}
