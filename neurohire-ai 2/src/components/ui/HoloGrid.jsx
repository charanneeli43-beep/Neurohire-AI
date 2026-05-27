// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Holographic Grid Background
// ──────────────────────────────────────────────

export default function HoloGrid() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: "grid-move 3s linear infinite",
        }}
      />

      {/* Radial purple glow center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Scanning light beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          width: 1,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(0,229,255,0.15), transparent)",
          animation: "slide-right 8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
