// ──────────────────────────────────────────────
//  NeuroHire AI  ·  3D Holographic Button
// ──────────────────────────────────────────────

const COLS = {
  cyan:   ["#00E5FF", "#002A33"],
  purple: ["#7C3AED", "#1A0A33"],
  pink:   ["#FF2D78", "#330010"],
  amber:  ["#FF9900", "#331F00"],
};

export default function Btn({
  children,
  onClick,
  color = "cyan",
  variant = "solid",
  disabled = false,
  style = {},
}) {
  const [ac, bc] = COLS[color] || COLS.cyan;

  const baseStyle =
    variant === "solid"
      ? {
          background: disabled
            ? "rgba(255,255,255,0.05)"
            : `linear-gradient(135deg, ${ac}22, ${ac}11)`,
          border: `1px solid ${disabled ? "rgba(255,255,255,0.1)" : ac + "88"}`,
          color: disabled ? "rgba(255,255,255,0.3)" : ac,
        }
      : {
          background: disabled ? "rgba(255,255,255,0.05)" : bc,
          border: `1px solid ${disabled ? "rgba(255,255,255,0.1)" : ac}`,
          color: disabled ? "rgba(255,255,255,0.3)" : ac,
        };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className="btn-3d"
      style={{
        ...baseStyle,
        padding: "10px 18px",
        borderRadius: 8,
        fontFamily: "'Rajdhani'",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.08em",
        boxShadow: disabled ? "none" : `0 4px 0 ${ac}44, 0 6px 20px ${ac}22`,
        textShadow: disabled ? "none" : `0 0 10px ${ac}`,
        transition: "all 0.12s",
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
