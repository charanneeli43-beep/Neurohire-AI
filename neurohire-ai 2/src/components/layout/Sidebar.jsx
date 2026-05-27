// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Sidebar Navigation
// ──────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { NAV_ITEMS } from "../../data/constants";

function RotatingCube({ size = 44 }) {
  const cubeRef = useRef(null);

  useEffect(() => {
    let frame, angle = 0;
    const tick = () => {
      angle += 0.8;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateY(${angle}deg) rotateX(${Math.sin(angle * 0.01) * 15}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const half = size / 2;
  const faces = [
    "rotateY(0deg)",
    "rotateY(90deg)",
    "rotateY(180deg)",
    "rotateY(-90deg)",
    "rotateX(90deg)",
    "rotateX(-90deg)",
  ];

  return (
    <div style={{ width: size, height: size, perspective: 400, perspectiveOrigin: "center" }}>
      <div
        ref={cubeRef}
        style={{ width: size, height: size, transformStyle: "preserve-3d", position: "relative" }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(0,229,255,${0.06 + (i % 3) * 0.03})`,
              border: "1px solid rgba(0,229,255,0.35)",
              transform: `${f} translateZ(${half}px)`,
              backfaceVisibility: "visible",
            }}
          />
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: "'Orbitron'",
              fontSize: size * 0.3,
              color: "#00E5FF",
              filter: "drop-shadow(0 0 6px #00E5FF)",
              zIndex: 10,
            }}
          >
            NH
          </span>
        </div>
      </div>
    </div>
  );
}

function NavItem({ id, label, icon, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 16px",
        background: active ? "rgba(0,229,255,0.1)" : "transparent",
        border: "none",
        borderLeft: active ? "3px solid #00E5FF" : "3px solid transparent",
        color: active ? "#00E5FF" : "rgba(255,255,255,0.45)",
        fontFamily: "'Rajdhani'",
        fontSize: 14,
        fontWeight: active ? 700 : 500,
        letterSpacing: "0.06em",
        textAlign: "left",
        transition: "all 0.2s",
        cursor: "pointer",
        boxShadow: active ? "inset 0 0 20px rgba(0,229,255,0.08)" : "none",
        marginBottom: 2,
      }}
    >
      <span style={{ fontSize: 16, filter: active ? "drop-shadow(0 0 6px #00E5FF)" : "none" }}>
        {icon}
      </span>
      {label.toUpperCase()}
      {active && (
        <div
          style={{
            marginLeft: "auto",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00E5FF",
            boxShadow: "0 0 8px #00E5FF",
          }}
        />
      )}
    </button>
  );
}

export default function Sidebar({ active, setActive }) {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
        background: "linear-gradient(180deg, rgba(4,6,15,0.98) 0%, rgba(8,12,28,0.98) 100%)",
        borderRight: "1px solid rgba(0,229,255,0.15)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 rgba(0,229,255,0.08)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
        <div className="float" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <RotatingCube size={44} />
          <div>
            <div
              style={{
                fontFamily: "'Orbitron'",
                fontSize: 13,
                fontWeight: 700,
                color: "#00E5FF",
                filter: "drop-shadow(0 0 8px rgba(0,229,255,0.6))",
                letterSpacing: "0.08em",
                lineHeight: 1.1,
              }}
            >
              NEURO
              <br />
              HIRE
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono'",
                fontSize: 9,
                color: "rgba(0,229,255,0.5)",
                letterSpacing: "0.1em",
                marginTop: 3,
              }}
            >
              AI · v2.6.0
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            height: 1,
            background: "linear-gradient(90deg, #00E5FF, transparent)",
          }}
        />
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {NAV_ITEMS.map((n) => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={setActive} />
        ))}
      </nav>

      {/* User info */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(0,229,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Share Tech Mono'",
              fontSize: 11,
              color: "#A78BFA",
              boxShadow: "0 0 12px rgba(124,58,237,0.3)",
            }}
          >
            HR
          </div>
          <div>
            <div style={{ fontFamily: "'Rajdhani'", fontSize: 12, fontWeight: 600, color: "#E2EAFF" }}>
              Admin User
            </div>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
              admin@neurohire.ai
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
