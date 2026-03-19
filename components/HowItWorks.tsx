type Step = { step: number; title: string; desc: string };
type ContactData = { whatsappNumber: string; whatsappMessage: string };

export default function HowItWorks({ data, contact }: { data?: Step[]; contact?: ContactData }) {
  const steps = data ?? [];
  const waHref = `https://wa.me/${contact?.whatsappNumber ?? "972533076696"}?text=${encodeURIComponent(contact?.whatsappMessage ?? "שלום")}`;

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", backgroundColor: "rgba(247,148,29,0.1)", color: "#E85D20", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", marginBottom: "1rem" }}>התהליך שלנו</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", color: "#1a2744", marginBottom: "1rem" }}>איך זה עובד?</h2>
          <p style={{ color: "#718096", fontSize: "1.1rem" }}>שלושה שלבים פשוטים להשגת הכסף שמגיע לך</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", position: "relative" }} className="steps-grid">
          <div style={{ position: "absolute", top: "60px", right: "16.66%", left: "16.66%", height: "3px", background: "linear-gradient(90deg, #3A5BA0, #F7941D)", zIndex: 0 }} className="connector-line" />
          {steps.map((step, index) => (
            <div key={step.step} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: index === 1 ? "linear-gradient(135deg, #F7941D, #E85D20)" : "linear-gradient(135deg, #3A5BA0, #5B7EC9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem", boxShadow: "0 8px 30px rgba(58,91,160,0.3)",
              }}>
                <span style={{ color: "white", fontWeight: "900", fontSize: "1.8rem" }}>{step.step}</span>
              </div>
              <h3 style={{ fontWeight: "800", fontSize: "1.2rem", color: "#1a2744", marginBottom: "0.75rem" }}>{step.title}</h3>
              <p style={{ color: "#718096", fontSize: "0.95rem", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href={waHref} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "linear-gradient(135deg, #3A5BA0, #5B7EC9)", color: "white",
            padding: "1rem 2.5rem", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "17px",
            boxShadow: "0 6px 30px rgba(58,91,160,0.4)",
          }}>
            💬 התחל את התהליך עכשיו — חינם
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr !important; } .connector-line { display: none !important; } }
      `}</style>
    </section>
  );
}
