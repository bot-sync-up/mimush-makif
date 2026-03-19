"use client";
import { useState, useEffect } from "react";

type Props = {
  data?: {
    enabled: boolean;
    title: string;
    subtitle: string;
    text: string;
    delaySeconds: number;
  };
  waHref?: string;
  phone?: string;
};

export default function PopupModal({ data, waHref, phone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data?.enabled) return;
    const seen = sessionStorage.getItem("popup_seen");
    if (seen === "1") return;
    const timer = setTimeout(() => setVisible(true), (data.delaySeconds || 10) * 1000);
    return () => clearTimeout(timer);
  }, [data]);

  function close() {
    sessionStorage.setItem("popup_seen", "1");
    setVisible(false);
  }

  if (!visible) return null;

  const wa = waHref || "https://wa.me/972533076696";
  const tel = phone ? `tel:${phone.replace(/\D/g, "")}` : "tel:0583225747";

  return (
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "2.5rem",
          maxWidth: "460px",
          width: "100%",
          boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          style={{
            position: "absolute", top: "1rem", left: "1rem",
            background: "#f1f5f9", border: "none",
            width: "32px", height: "32px", borderRadius: "50%",
            cursor: "pointer", fontSize: "18px", lineHeight: 1,
            color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Icon */}
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🎯</div>

        {/* Title */}
        <h3 style={{
          fontSize: "1.5rem", fontWeight: "900",
          color: "#1a2744", marginBottom: "0.5rem",
        }}>
          {data?.title}
        </h3>
        <div style={{
          fontSize: "1rem", fontWeight: "700",
          color: "#F7941D", marginBottom: "1rem",
        }}>
          {data?.subtitle}
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, marginBottom: "1.75rem" }}>
          {data?.text}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              backgroundColor: "#25D366", color: "white",
              padding: "0.875rem", borderRadius: "12px",
              textDecoration: "none", fontWeight: "700", fontSize: "15px",
            }}
          >
            💬 שלח הודעה בוואטסאפ
          </a>
          <a
            href={tel}
            onClick={close}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              backgroundColor: "#EBF4FF", color: "#3A5BA0",
              padding: "0.875rem", borderRadius: "12px",
              textDecoration: "none", fontWeight: "700", fontSize: "15px",
            }}
          >
            📞 התקשר עכשיו
          </a>
          <button
            onClick={close}
            style={{
              background: "none", border: "none",
              color: "#94a3b8", fontSize: "13px", cursor: "pointer",
              fontFamily: "Heebo, sans-serif",
            }}
          >
            אולי בפעם אחרת
          </button>
        </div>
      </div>
    </div>
  );
}
