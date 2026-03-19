"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/services", label: "שירותים" },
  { href: "/about", label: "אודות" },
  { href: "#contact", label: "צור קשר" },
];

type ContactData = { phone: string; phoneHref: string; whatsappNumber: string; whatsappMessage: string };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contact, setContact] = useState<ContactData>({
    phone: "058-322-5747", phoneHref: "tel:0583225747",
    whatsappNumber: "972533076696", whatsappMessage: "שלום, אני מעוניין בייעוץ ראשוני חינם",
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    fetch("/api/content").then(r => r.json()).then(c => c.contact && setContact(c.contact));
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <header
      style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 50,
        transition: "all 0.3s",
        backgroundColor: scrolled ? "white" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ filter: scrolled ? "none" : "brightness(0) invert(1)", transition: "filter 0.3s" }}>
            <Logo size={44} showText={false} />
          </div>
        </Link>

        {/* Business name */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "900", fontSize: "17px", color: scrolled ? "#3A5BA0" : "white", lineHeight: 1.1, fontFamily: "Heebo, sans-serif" }}>מימוש מקיף</span>
          <span style={{ fontSize: "11px", color: "#F7941D", lineHeight: 1.2, fontFamily: "Heebo, sans-serif" }}>מיצוי זכויות ממשלתיות</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: "none", color: scrolled ? "#1a2744" : "white",
              fontWeight: "500", fontSize: "15px", transition: "color 0.2s",
              fontFamily: "Heebo, sans-serif",
            }}>
              {link.label}
            </Link>
          ))}
          <a href={contact.phoneHref} style={{
            background: "linear-gradient(135deg, #F7941D, #E85D20)",
            color: "white", padding: "0.5rem 1.25rem", borderRadius: "25px",
            textDecoration: "none", fontWeight: "700", fontSize: "14px",
            whiteSpace: "nowrap", fontFamily: "Heebo, sans-serif",
          }}>
            📞 {contact.phone}
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: scrolled ? "#3A5BA0" : "white", fontSize: "24px" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "white", padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid #eee" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "0.75rem 0", color: "#1a2744",
              textDecoration: "none", fontWeight: "600", fontSize: "16px",
              borderBottom: "1px solid #f0f0f0", fontFamily: "Heebo, sans-serif",
            }}>
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <a href={contact.phoneHref} style={{
              flex: 1, background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)", color: "white",
              padding: "0.75rem", borderRadius: "10px", textDecoration: "none",
              fontWeight: "700", textAlign: "center", fontSize: "14px", fontFamily: "Heebo, sans-serif",
            }}>📞 התקשר</a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, backgroundColor: "#25D366", color: "white",
              padding: "0.75rem", borderRadius: "10px", textDecoration: "none",
              fontWeight: "700", textAlign: "center", fontSize: "14px", fontFamily: "Heebo, sans-serif",
            }}>💬 וואטסאפ</a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .desktop-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
      `}</style>
    </header>
  );
}
