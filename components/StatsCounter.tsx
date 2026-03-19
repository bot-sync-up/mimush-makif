"use client";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string };

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000, steps = 60, increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsCounter({ data }: { data?: Stat[] }) {
  const stats = data ?? [
    { value: 500, suffix: "+", label: "לקוחות מרוצים" },
    { value: 15, suffix: "M+", label: "שקלים הושגו" },
    { value: 12, suffix: "", label: "שנות ניסיון" },
  ];

  return (
    <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #3A5BA0, #1a2744)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: "2rem" }} className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", color: "#F7941D", lineHeight: 1, marginBottom: "0.5rem" }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: "500" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
