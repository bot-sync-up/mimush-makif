"use client";
import { useState, useEffect } from "react";

type Props = {
  data?: {
    enabled: boolean;
    text: string;
    link?: string;
    linkText?: string;
    bgColor?: string;
    textColor?: string;
  };
};

export default function AnnouncementBar({ data }: Props) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement_closed");
    if (dismissed === "1") setClosed(true);
  }, []);

  if (!data?.enabled || closed) return null;

  const bg = data.bgColor || "#1a2744";
  const color = data.textColor || "#ffffff";

  function close() {
    sessionStorage.setItem("announcement_closed", "1");
    setClosed(true);
  }

  return (
    <div style={{
      backgroundColor: bg,
      color,
      padding: "10px 1.5rem",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "600",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      zIndex: 100,
    }}>
      <span>{data.text}</span>
      {data.link && data.linkText && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#F7941D",
            textDecoration: "underline",
            fontWeight: "700",
            whiteSpace: "nowrap",
          }}
        >
          {data.linkText}
        </a>
      )}
      <button
        onClick={close}
        aria-label="סגור"
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color,
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          opacity: 0.7,
          padding: "4px 8px",
        }}
      >
        ×
      </button>
    </div>
  );
}
