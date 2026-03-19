"use client";

type ContactData = { whatsappNumber: string; whatsappMessage: string };

export default function FloatingWhatsApp({ contact }: { contact?: ContactData }) {
  const c = contact ?? { whatsappNumber: "972533076696", whatsappMessage: "שלום" };
  const waHref = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <a href={waHref} target="_blank" rel="noopener noreferrer" title="שלח הודעת וואטסאפ"
      style={{
        position: "fixed", bottom: "24px", left: "24px",
        width: "60px", height: "60px", borderRadius: "50%",
        backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)", zIndex: 999, textDecoration: "none",
        fontSize: "30px", transition: "transform 0.3s, box-shadow 0.3s",
        animation: "pulse 2s infinite",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.7)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.5)"; }}>
      💬
      <style>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); } 70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }`}</style>
    </a>
  );
}
