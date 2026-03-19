import Link from "next/link";

type ContactData = { phone: string; phoneHref: string; email: string; whatsappNumber: string; whatsappMessage: string };
type SettingsData = { businessName: string; slogan: string };

export default function Footer({ contact, settings }: { contact?: ContactData; settings?: SettingsData }) {
  const c = contact ?? { phone: "058-322-5747", phoneHref: "tel:0583225747", email: "info@example.com", whatsappNumber: "972533076696", whatsappMessage: "שלום" };
  const s = settings ?? { businessName: "מימוש מקיף", slogan: "מיצוי זכויות ממשלתיות, רק תיקח" };
  const waHref = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <footer style={{ backgroundColor: "#1a2744", color: "white", padding: "3rem 1.5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontWeight: "800", fontSize: "22px", marginBottom: "0.5rem" }}>{s.businessName}</div>
            <div style={{ color: "#F7941D", fontSize: "13px", marginBottom: "1rem" }}>{s.slogan}</div>
            <p style={{ color: "#a0aec0", fontSize: "14px", lineHeight: 1.7 }}>אנו מתמחים במיצוי מלא של זכויות מהביטוח הלאומי. ייעוץ ראשוני חינם, תשלום רק בהצלחה.</p>
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "1rem", color: "#F7941D" }}>ניווט מהיר</div>
            {[
              { href: "/", label: "דף הבית" }, { href: "/services", label: "השירותים שלנו" },
              { href: "/about", label: "אודות מימוש מקיף" }, { href: "#faq", label: "שאלות נפוצות" },
              { href: "#contact", label: "צור קשר" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: "block", color: "#a0aec0", textDecoration: "none", marginBottom: "0.5rem", fontSize: "14px" }}>{link.label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "1rem", color: "#F7941D" }}>תחומי התמחות</div>
            {["קצבת נכות", "תאונות עבודה", "קצבת זקנה", "ייעוץ כללי", "ערעורים"].map(svc => (
              <div key={svc} style={{ color: "#a0aec0", marginBottom: "0.5rem", fontSize: "14px" }}>✓ {svc}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "1rem", color: "#F7941D" }}>יצירת קשר</div>
            <a href={c.phoneHref} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#a0aec0", textDecoration: "none", marginBottom: "0.75rem", fontSize: "14px" }}>📞 {c.phone}</a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#a0aec0", textDecoration: "none", marginBottom: "0.75rem", fontSize: "14px" }}>💬 וואטסאפ</a>
            <a href={`mailto:${c.email}`} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}>✉️ {c.email}</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2d3748", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ color: "#718096", fontSize: "13px" }}>© {new Date().getFullYear()} {s.businessName}. כל הזכויות שמורות.</p>
          <p style={{ color: "#718096", fontSize: "13px" }}>{s.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
