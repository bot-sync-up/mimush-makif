"use client";
import { useForm } from "react-hook-form";

type ContactData = { phone: string; phoneHref: string; email: string; whatsappNumber: string; whatsappMessage: string };
type Service = { id: string; title: string };
type FormData = { name: string; phone: string; service: string; message: string };

export default function ContactCTA({ contact, services }: { contact?: ContactData; services?: Service[] }) {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<FormData>();
  const c = contact ?? { phone: "058-322-5747", phoneHref: "tel:0583225747", email: "info@example.com", whatsappNumber: "972533076696", whatsappMessage: "שלום" };
  const waHref = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;
  const svcs = services ?? [];

  const onSubmit = async (data: FormData) => {
    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <section id="contact" style={{ padding: "5rem 1.5rem", backgroundColor: "#F8FAFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="contact-grid">
          <div>
            <div style={{ display: "inline-block", backgroundColor: "rgba(58,91,160,0.1)", color: "#3A5BA0", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "1rem" }}>צור קשר</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>
              מוכן לברר<br /><span style={{ color: "#3A5BA0" }}>מה מגיע לך?</span>
            </h2>
            <p style={{ color: "#718096", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>פנה אלינו עכשיו לייעוץ ראשוני חינם לגמרי. אנחנו נבדוק מה מגיע לך ונחזור אליך בהקדם.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📞", label: "טלפון", value: c.phone, href: c.phoneHref, bg: "#EBF4FF", color: "#3A5BA0" },
                { icon: "💬", label: "וואטסאפ", value: "שלח הודעה עכשיו", href: waHref, bg: "#EAFAF1", color: "#25D366" },
                { icon: "✉️", label: "אימייל", value: c.email, href: `mailto:${c.email}`, bg: "#FFF8F0", color: "#E85D20" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.label === "וואטסאפ" ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", borderRadius: "14px", backgroundColor: item.bg, textDecoration: "none", transition: "transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#718096", fontWeight: "500" }}>{item.label}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: item.color }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div id="contact-form">
            <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "2.5rem", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
              {isSubmitSuccessful ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                  <h3 style={{ fontWeight: "800", color: "#1a2744", marginBottom: "0.5rem" }}>תודה! קיבלנו את פנייתך</h3>
                  <p style={{ color: "#718096" }}>נחזור אליך בהקדם האפשרי</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h3 style={{ fontWeight: "800", fontSize: "1.3rem", color: "#1a2744", marginBottom: "1.5rem" }}>קבל ייעוץ ראשוני חינם</h3>
                  {[
                    { name: "name" as const, label: "שם מלא", placeholder: "ישראל ישראלי", type: "text" },
                    { name: "phone" as const, label: "טלפון", placeholder: "050-000-0000", type: "tel" },
                  ].map(f => (
                    <div key={f.name} style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontWeight: "600", color: "#374151", fontSize: "14px", marginBottom: "6px" }}>{f.label} *</label>
                      <input {...register(f.name, { required: true })} type={f.type} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "15px", color: "#1a2744", outline: "none", boxSizing: "border-box", fontFamily: "Heebo, sans-serif", direction: "rtl" }}
                        onFocus={e => { e.target.style.borderColor = "#3A5BA0"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontWeight: "600", color: "#374151", fontSize: "14px", marginBottom: "6px" }}>סוג שירות</label>
                    <select {...register("service")} style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "15px", color: "#1a2744", outline: "none", boxSizing: "border-box", fontFamily: "Heebo, sans-serif", backgroundColor: "white", direction: "rtl", cursor: "pointer" }}>
                      <option value="">בחר שירות...</option>
                      {svcs.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      <option value="other">אחר / לא יודע</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontWeight: "600", color: "#374151", fontSize: "14px", marginBottom: "6px" }}>פרטים נוספים (אופציונלי)</label>
                    <textarea {...register("message")} placeholder="ספר לנו בקצרה על המצב שלך..." rows={3}
                      style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "15px", color: "#1a2744", outline: "none", boxSizing: "border-box", fontFamily: "Heebo, sans-serif", resize: "vertical", direction: "rtl" }}
                      onFocus={e => { e.target.style.borderColor = "#3A5BA0"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; }} />
                  </div>
                  <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)", color: "white", fontWeight: "700", fontSize: "16px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, fontFamily: "Heebo, sans-serif" }}>
                    {isSubmitting ? "שולח..." : "📋 שלח ואני אחזור אליך"}
                  </button>
                  <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "12px", marginTop: "1rem" }}>✓ ייעוץ ראשוני חינם · ✓ ללא התחייבות · ✓ תשלום רק בהצלחה</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
