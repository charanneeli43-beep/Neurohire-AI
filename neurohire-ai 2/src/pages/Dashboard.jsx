// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Dashboard Page
// ──────────────────────────────────────────────

import Card3D from "../components/ui/Card3D";
import { HoloTag, ScoreDisc, StatusChip, PageHeader } from "../components/ui/atoms";

export default function Dashboard({ jobs, candidates }) {
  const activeJobs   = jobs.filter(j => j.status === "active").length;
  const shortlisted  = candidates.filter(c => c.status === "shortlisted").length;
  const interviews   = candidates.filter(c => c.status === "interview").length;
  const avgScore     = Math.round(candidates.reduce((a, c) => a + c.score, 0) / (candidates.length || 1));

  const stages = [
    ["Applied",    candidates.length,                                           "#00E5FF"],
    ["Review",     candidates.filter(c => c.status === "review").length,        "#FBBF24"],
    ["Shortlisted", shortlisted,                                                "#7C3AED"],
    ["Interview",  interviews,                                                  "#FF2D78"],
    ["Offer",      0,                                                           "#22D3EE"],
  ];
  const maxS = Math.max(...stages.map(s => s[1]), 1);

  const stats = [
    { label: "Active Roles", value: activeJobs,           color: "cyan",   sub: "↑ 2 this week" },
    { label: "Candidates",   value: candidates.length,    color: "purple", sub: `avg score ${avgScore}` },
    { label: "Shortlisted",  value: shortlisted,          color: "amber",  sub: "ready for review" },
    { label: "Interviews",   value: interviews,            color: "pink",   sub: "this week" },
  ];

  const statHex = { cyan: "#00E5FF", purple: "#A78BFA", amber: "#FBBF24", pink: "#FF2D78" };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 0 }}>
        <PageHeader label="// COMMAND CENTER / OVERVIEW" title="DASHBOARD" />
        <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "rgba(0,229,255,0.5)", textAlign: "right", marginBottom: 28, marginLeft: 16 }}>
          <div>WED 20 MAY 2026</div>
          <div style={{ color: "#00E5FF", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", padding: "2px 8px", marginTop: 4, display: "inline-block" }}>
            ● LIVE
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <Card3D key={i} color={s.color} style={{ padding: "20px 18px", animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "'Orbitron'", fontSize: 44, fontWeight: 900, color: statHex[s.color], lineHeight: 1, textShadow: `0 0 20px ${statHex[s.color]}, 0 0 40px ${statHex[s.color]}66` }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: `${statHex[s.color]}88`, marginTop: 6, letterSpacing: "0.06em" }}>
              {s.sub}
            </div>
          </Card3D>
        ))}
      </div>

      {/* Main panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        {/* Recent candidates */}
        <Card3D color="cyan" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(0,229,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Orbitron'", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "#00E5FF" }}>RECENT CANDIDATES</span>
            <HoloTag>{candidates.length} TOTAL</HoloTag>
          </div>
          <div style={{ padding: "0 18px" }}>
            {candidates.slice(0, 5).map((c, i) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#A78BFA", flexShrink: 0, boxShadow: "0 0 10px rgba(124,58,237,0.2)" }}>
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{c.role}</div>
                </div>
                <ScoreDisc score={c.score} />
                <StatusChip status={c.status} />
              </div>
            ))}
          </div>
        </Card3D>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Funnel */}
          <Card3D color="purple" style={{ padding: "16px 18px", flex: 1 }}>
            <div style={{ fontFamily: "'Orbitron'", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#A78BFA", marginBottom: 14 }}>
              HIRING FUNNEL
            </div>
            {stages.map(([stage, count, color]) => (
              <div key={stage} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontSize: 9, marginBottom: 4, letterSpacing: "0.06em" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{stage}</span>
                  <span style={{ color }}>{count}</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(count / maxS) * 100}%`, background: color, borderRadius: 3, boxShadow: `0 0 6px ${color}`, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
              </div>
            ))}
          </Card3D>

          {/* AI insight */}
          <Card3D color="cyan" float style={{ padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#00E5FF", letterSpacing: "0.1em", marginBottom: 6 }}>◆ AI NEURAL INSIGHT</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontWeight: 400 }}>
              ML Engineer pipeline shows highest candidate quality. Recommend fast-tracking top 3 profiles — conversion probability peaks this week.
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}
