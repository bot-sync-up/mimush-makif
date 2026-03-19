"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

type Submission = {
  id: string;
  name: string;
  phone: string;
  service: string;
  message?: string;
  date: string;
  read: boolean;
};

export default function SubmissionsAdmin() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/submissions");
    if (r.ok) setItems(await r.json());
    setLoading(false);
  }

  async function markRead(id: string) {
    await fetch("/api/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "read" }),
    });
    setItems(items.map(s => s.id === id ? { ...s, read: true } : s));
  }

  async function remove(id: string) {
    if (!confirm("למחוק פנייה זו?")) return;
    await fetch("/api/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "delete" }),
    });
    setItems(items.filter(s => s.id !== id));
  }

  const displayed = filter === "unread" ? items.filter(s => !s.read) : items;
  const unreadCount = items.filter(s => !s.read).length;

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: "900px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#1a2744" }}>📬 פניות מהאתר</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {items.length} פניות סה&quot;כ
              {unreadCount > 0 && <span style={{ color: "#DC2626", fontWeight: "700" }}> · {unreadCount} לא נקראו</span>}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {(["all", "unread"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "0.5rem 1rem", borderRadius: "8px", border: "2px solid",
                borderColor: filter === f ? "#3A5BA0" : "#e2e8f0",
                backgroundColor: filter === f ? "#EBF4FF" : "white",
                color: filter === f ? "#3A5BA0" : "#64748b",
                fontWeight: "600", fontSize: "13px", cursor: "pointer",
                fontFamily: "Heebo, sans-serif",
              }}>
                {f === "all" ? "הכל" : `לא נקרא (${unreadCount})`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>טוען פניות...</div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "white", borderRadius: "16px", border: "2px solid #e2e8f0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <div style={{ fontWeight: "700", color: "#1a2744", fontSize: "1.1rem" }}>אין פניות עדיין</div>
            <div style={{ color: "#94a3b8", fontSize: "14px", marginTop: "0.5rem" }}>פניות מהאתר יופיעו כאן</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {displayed.map(sub => (
              <div key={sub.id} style={{
                backgroundColor: "white", borderRadius: "16px",
                border: `2px solid ${sub.read ? "#e2e8f0" : "#3A5BA040"}`,
                padding: "1.25rem 1.5rem",
                boxShadow: sub.read ? "none" : "0 4px 16px rgba(58,91,160,0.1)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontWeight: "800", fontSize: "16px", flexShrink: 0,
                    }}>
                      {sub.name[0]}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: "800", color: "#1a2744", fontSize: "15px" }}>{sub.name}</span>
                        {!sub.read && (
                          <span style={{ backgroundColor: "#3A5BA0", color: "white", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "10px" }}>חדש</span>
                        )}
                      </div>
                      <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
                        <a href={`tel:${sub.phone.replace(/\D/g, "")}`} style={{ color: "#3A5BA0", fontWeight: "600", textDecoration: "none" }}>{sub.phone}</a>
                        {sub.service && sub.service !== "לא צוין" && <span> · {sub.service}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{formatDate(sub.date)}</span>
                    {!sub.read && (
                      <button onClick={() => markRead(sub.id)}
                        style={{ backgroundColor: "#EBF4FF", border: "none", color: "#3A5BA0", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "Heebo, sans-serif" }}>
                        סמן כנקרא
                      </button>
                    )}
                    <button onClick={() => remove(sub.id)}
                      style={{ backgroundColor: "#FEE2E2", border: "none", color: "#DC2626", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontFamily: "Heebo, sans-serif" }}>
                      מחק
                    </button>
                  </div>
                </div>
                {sub.message && (
                  <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "#f8fafc", borderRadius: "10px", fontSize: "14px", color: "#4a5568", lineHeight: 1.6, borderRight: "3px solid #3A5BA040" }}>
                    {sub.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
