"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "שגיאה בהתחברות");
      }
    } catch {
      setError("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a2744 0%, #3A5BA0 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Heebo, sans-serif", direction: "rtl",
      padding: "1rem",
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "24px",
        padding: "3rem", width: "100%", maxWidth: "420px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "70px", height: "70px", borderRadius: "50%",
            background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem", fontSize: "2rem",
          }}>✓</div>
          <h1 style={{ fontWeight: "900", fontSize: "1.6rem", color: "#1a2744", margin: 0 }}>
            ממשק ניהול
          </h1>
          <p style={{ color: "#718096", fontSize: "14px", marginTop: "6px" }}>
            מימוש מקיף
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{
              display: "block", fontWeight: "600",
              color: "#374151", fontSize: "14px", marginBottom: "8px",
            }}>
              סיסמת ניהול
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמה..."
              style={{
                width: "100%", padding: "0.875rem 1rem",
                borderRadius: "10px", border: "2px solid #e2e8f0",
                fontSize: "16px", outline: "none", boxSizing: "border-box",
                fontFamily: "Heebo, sans-serif", direction: "rtl",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#3A5BA0"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: "#FEF2F2", color: "#DC2626",
              padding: "0.75rem 1rem", borderRadius: "10px",
              fontSize: "14px", marginBottom: "1rem",
              border: "1px solid #FECACA",
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%", padding: "1rem",
              background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
              color: "white", border: "none", borderRadius: "12px",
              fontWeight: "700", fontSize: "16px", cursor: "pointer",
              fontFamily: "Heebo, sans-serif",
              opacity: loading || !password ? 0.6 : 1,
            }}
          >
            {loading ? "מתחבר..." : "🔐 כניסה לניהול"}
          </button>
        </form>

        <p style={{
          textAlign: "center", color: "#9ca3af",
          fontSize: "12px", marginTop: "1.5rem",
        }}>
          הסיסמה ניתנת לשינוי בהגדרות המערכת
        </p>
      </div>
    </div>
  );
}
