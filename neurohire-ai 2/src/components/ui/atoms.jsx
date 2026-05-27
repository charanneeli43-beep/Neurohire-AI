// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Shared UI Atoms
// ──────────────────────────────────────────────

// ── HoloTag ───────────────────────────────────
const TAG_COLS = {
  cyan:   ["#00E5FF", "0,229,255"],
  purple: ["#A78BFA", "124,58,237"],
  amber:  ["#FBBF24", "251,191,36"],
  pink:   ["#FF2D78", "255,45,120"],
  green:  ["#22D3EE", "34,211,238"],
};

export function HoloTag({ children, color = "cyan" }) {
  const [c, rgb] = TAG_COLS[color] || TAG_COLS.cyan;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        background: `rgba(${rgb},0.1)`,
        border: `1px solid rgba(${rgb},0.4)`,
        color: c,
        borderRadius: 4,
        fontFamily: "'Share Tech Mono'",
        fontSize: 10,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        boxShadow: `0 0 8px rgba(${rgb},0.15)`,
        textShadow: `0 0 6px ${c}`,
      }}
    >
      {children}
    </span>
  );
}

// ── ScoreDisc ─────────────────────────────────
export function ScoreDisc({ score }) {
  const [color] =
    score >= 85
      ? ["#00E5FF"]
      : score >= 70
      ? ["#FBBF24"]
      : ["#FF2D78"];
  const r = 18;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;

  return (
    <div style={{ position: "relative", width: 50, height: 50, flexShrink: 0 }}>
      <svg width="50" height="50" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
        <circle
          cx="25" cy="25" r={r}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Orbitron'",
          fontSize: 11,
          fontWeight: 700,
          color,
          textShadow: `0 0 8px ${color}`,
        }}
      >
        {score}
      </div>
    </div>
  );
}

// ── StatusChip ────────────────────────────────
const STATUS_COLORS = {
  active:      "cyan",
  shortlisted: "cyan",
  review:      "amber",
  interview:   "purple",
  rejected:    "pink",
  paused:      "cyan",
};

export function StatusChip({ status }) {
  return <HoloTag color={STATUS_COLORS[status] || "cyan"}>{status}</HoloTag>;
}

// ── PageHeader ────────────────────────────────
export function PageHeader({ label, title }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          fontFamily: "'Share Tech Mono'",
          fontSize: 10,
          color: "rgba(0,229,255,0.5)",
          letterSpacing: "0.15em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <h1
        style={{
          fontFamily: "'Orbitron'",
          fontSize: 28,
          fontWeight: 900,
          color: "#E2EAFF",
          letterSpacing: "0.05em",
          textShadow: "0 0 30px rgba(0,229,255,0.3)",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          marginTop: 10,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(0,229,255,0.6), rgba(124,58,237,0.3), transparent)",
        }}
      />
    </div>
  );
}
