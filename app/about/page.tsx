import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WHATSAPP_HREF, PHONE_HREF } from "@/lib/constants";

const VALUES = [
  { icon: "🤝", title: "אמינות מלאה", desc: "אנחנו עובדים בשיקוף מלא. אתה תמיד יודע מה קורה עם התיק שלך ומה הסיכויים להצלחה." },
  { icon: "💪", title: "מחויבות לתוצאה", desc: "אנחנו מרוויחים רק כשאתה מרוויח. לכן אנחנו מחויבים להצלחת כל תיק ותיק." },
  { icon: "❤️", title: "אמפתיה ואנושיות", desc: "אנחנו מבינים שמדובר בזכויות חשובות. נלווה אותך בסבלנות ובהתאמה אישית לכל שלב." },
  { icon: "🎯", title: "מקצועיות ומומחיות", desc: "12 שנות ניסיון ספציפי בביטוח לאומי מאפשרות לנו לזהות הזדמנויות שאחרים מפספסים." },
];

const TEAM = [
  { name: "ראש הצוות", role: "מייסד ומנהל", emoji: "👨‍💼", years: "12 שנות ניסיון" },
  { name: "יועצת בכירה", role: "מומחית בקצבאות", emoji: "👩‍💼", years: "8 שנות ניסיון" },
  { name: "מומחה ערעורים", role: "ייצוג מול וועדות", emoji: "👨‍⚖️", years: "6 שנות ניסיון" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <FloatingWhatsApp />

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a2744 0%, #3A5BA0 100%)",
        padding: "10rem 1.5rem 5rem",
        textAlign: "center",
      }}>
        <h1 style={{ color: "white", fontWeight: "900", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>
          אודות מימוש מקיף
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto" }}>
          12 שנות ניסיון בהוצאת הכסף שמגיע לך מהמדינה
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1.5rem" }}>
              הסיפור שלנו
            </h2>
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.9 }}>
              מימוש מקיף נוסדה מתוך הכרה שאנשים רבים מפסידים סכומי כסף משמעותיים בגלל אי-ידיעה על זכויותיהם.
              ביטוח הלאומי והמדינה מציעים עשרות גמלאות וקצבאות, אך הבירוקרטיה המורכבת מרתיעה אנשים מלממש אותן.
            </p>
            <br />
            <p style={{ color: "#4a5568", fontSize: "1.05rem", lineHeight: 1.9 }}>
              אנחנו כאן כדי לשנות את זה. עם ניסיון של 12 שנה וידע מעמיק במערכת הביטוח הלאומי,
              אנחנו לוקחים את הבירוקרטיה על עצמנו ומאפשרים לך לקבל את מה שמגיע לך — בלי לשאת בסיכון.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "4rem",
          }} className="about-stats">
            {[
              { value: "500+", label: "לקוחות טופלו" },
              { value: "₪15M+", label: "הושגו ללקוחות" },
              { value: "97%", label: "שביעות רצון" },
            ].map((s) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "2rem",
                backgroundColor: "#F8FAFF", borderRadius: "20px",
                border: "2px solid rgba(58,91,160,0.1)",
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#3A5BA0", marginBottom: "0.5rem" }}>
                  {s.value}
                </div>
                <div style={{ color: "#718096", fontSize: "15px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8FAFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "900", color: "#1a2744" }}>
              הערכים שלנו
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{
                backgroundColor: "white", borderRadius: "20px",
                padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid rgba(58,91,160,0.08)",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.icon}</div>
                <h3 style={{ fontWeight: "800", color: "#1a2744", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ color: "#718096", fontSize: "0.95rem", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "900", color: "#1a2744" }}>
              הצוות שלנו
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            justifyItems: "center",
          }}>
            {TEAM.map((member) => (
              <div key={member.name} style={{ textAlign: "center", maxWidth: "240px" }}>
                <div style={{
                  width: "100px", height: "100px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "3rem", margin: "0 auto 1rem",
                  boxShadow: "0 8px 30px rgba(58,91,160,0.25)",
                }}>
                  {member.emoji}
                </div>
                <div style={{ fontWeight: "800", color: "#1a2744", fontSize: "1.1rem", marginBottom: "4px" }}>
                  {member.name}
                </div>
                <div style={{ color: "#3A5BA0", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                  {member.role}
                </div>
                <div style={{ color: "#F7941D", fontSize: "13px" }}>{member.years}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: "linear-gradient(135deg, #3A5BA0, #1a2744)",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}>
        <h2 style={{ color: "white", fontWeight: "900", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
          מוכן לבדוק מה מגיע לך?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: "2rem" }}>
          ייעוץ ראשוני חינם — ללא סיכון, ללא התחייבות
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366", color: "white",
              padding: "1rem 2rem", borderRadius: "50px",
              textDecoration: "none", fontWeight: "700", fontSize: "16px",
            }}
          >
            💬 שלח וואטסאפ
          </a>
          <a
            href={PHONE_HREF}
            style={{
              backgroundColor: "white", color: "#3A5BA0",
              padding: "1rem 2rem", borderRadius: "50px",
              textDecoration: "none", fontWeight: "700", fontSize: "16px",
            }}
          >
            📞 התקשר עכשיו
          </a>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 600px) {
          .about-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
