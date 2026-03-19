export default function Logo({ size = 60, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.18 + "px" }}>
      {/* SVG Logo - recreated from the brand image */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A6FC4" />
            <stop offset="100%" stopColor="#3A5BA0" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7941D" />
            <stop offset="100%" stopColor="#E85D20" />
          </linearGradient>
          <linearGradient id="blueDarkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2a4585" />
            <stop offset="100%" stopColor="#3A5BA0" />
          </linearGradient>
        </defs>

        {/* Main blue circle */}
        <circle cx="95" cy="105" r="82" fill="url(#blueGrad)" />

        {/* Dark blue shadow/depth on left */}
        <path
          d="M 28 130 A 82 82 0 0 1 95 23 A 82 82 0 0 0 28 130 Z"
          fill="url(#blueDarkGrad)"
          opacity="0.6"
        />

        {/* Orange teardrop / swoosh shape */}
        <path
          d="M 110 35 C 145 45 175 80 175 115 C 175 148 155 175 130 185 C 115 165 108 140 110 115 C 112 90 118 60 110 35 Z"
          fill="url(#orangeGrad)"
        />

        {/* White checkmark */}
        <path
          d="M 55 110 L 80 140 L 145 70"
          stroke="white"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div style={{ lineHeight: 1 }}>
          <div style={{
            fontFamily: "Heebo, sans-serif",
            fontWeight: "900",
            fontSize: size * 0.35 + "px",
            color: "#3A5BA0",
            lineHeight: 1.1,
          }}>
            מימוש מקיף
          </div>
          <div style={{
            fontFamily: "Heebo, sans-serif",
            fontSize: size * 0.18 + "px",
            color: "#F7941D",
            fontWeight: "600",
            lineHeight: 1.2,
          }}>
            מיצוי זכויות ממשלתיות, רק תיקח
          </div>
        </div>
      )}
    </div>
  );
}
