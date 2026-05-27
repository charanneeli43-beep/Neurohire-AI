// ──────────────────────────────────────────────
//  NeuroHire AI  ·  3D Holographic Card
// ──────────────────────────────────────────────

const COLOR_MAP = {
  cyan:   "0,229,255",
  purple: "124,58,237",
  pink:   "255,45,120",
  amber:  "251,191,36",
  green:  "34,211,238",
};

export default function Card3D({ children, style = {}, color = "cyan", float = false, className = "" }) {
  const rgb = COLOR_MAP[color] || COLOR_MAP.cyan;
  return (
    <div
      className={`card-3d ${float ? "float" : ""} ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},0.08) 0%, rgba(0,0,0,0.4) 100%)`,
        border: `1px solid rgba(${rgb},0.25)`,
        borderRadius: 12,
        boxShadow: `
          0 8px 32px rgba(0,0,0,0.5),
          0 0 0 1px rgba(${rgb},0.1),
          inset 0 1px 0 rgba(255,255,255,0.06),
          0 4px 0 rgba(0,0,0,0.6),
          0 8px 0 rgba(0,0,0,0.4)
        `,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Top shine line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.6), transparent)`,
        }}
      />
      {/* Sheen overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-20%",
            width: "40%",
            height: "100%",
            background: `rgba(${rgb},0.03)`,
            transform: "skewX(-15deg)",
          }}
        />
      </div>

      {children}
    </div>
  );
}
