// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Analytics Page
// ──────────────────────────────────────────────

import Card3D from "../components/ui/Card3D";
import { PageHeader } from "../components/ui/atoms";

const STATUS_COLORS = {
  review:      "#FBBF24",
  shortlisted: "#00E5FF",
  interview:   "#A78BFA",
  rejected:    "#FF2D78",
};

export default function Analytics({ candidates, jobs }) {
  const total      = candidates.length || 1;
  const avgScore   = Math.round(candidates.reduce((a, c) => a + c.score, 0) / total);
  const shortlistRate = Math.round((candidates.filter(c => ["shortlisted", "interview"].includes(c.status)).length / total) * 100);
  const activeRoles = jobs.filter(j => j.status === "active").length;

  const byStatus = ["review", "shortlisted", "interview", "rejected"].map(s => ({
    label: s,
    count: candidates.filter(c => c.status === s).length,
  }));
  const maxCount = Math.max(...byStatus.map(s => s.count), 1);

  const byJob = jobs.map(j => {
    const jc = candidates.filter(c => c.jobId === j.id);
    return { job: j.title, avg: jc.length ? Math.round(jc.reduce((a, c) => a + c.score, 0) / jc.length) : 0, count: jc.length };
  });
  const maxAvg = Math.max(...byJob.map(j => j.avg), 1);

  const scoreRanges = [
    ["90–100", 90, 100, "#00E5FF"],
    ["80–89",  80,  89, "#A78BFA"],
    ["70–79",  70,  79, "#FBBF24"],
    ["< 70",    0,  69, "#FF2D78"],
  ];

  return (
    <div className="fade-up">
      <PageHeader label="// PIPELINE INTELLIGENCE / INSIGHTS" title="ANALYTICS" />

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          ["CANDIDATES",    candidates.length, "#00E5FF", "cyan"],
          ["SHORTLIST %",   `${shortlistRate}%`, "#22D3EE", "green"],
          ["AVG SCORE",     avgScore,           "#FBBF24", "amber"],
          ["ACTIVE ROLES",  activeRoles,        "#FF2D78", "pink"],
        ].map(([label, val, color, cname], i) => (
          <Card3D key={i} color={cname} float style={{ padding: "18px 16px", textAlign: "center", animationDelay: `${i * 0.15}s` }}>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: "'Orbitron'", fontSize: 36, fontWeight: 900, color, textShadow: `0 0 20px ${color}`, lineHeight: 1 }}>{val}</div>
          </Card3D>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Pipeline stages */}
        <Card3D color="purple" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#A78BFA", letterSpacing: "0.1em", marginBottom: 16 }}>PIPELINE STAGES</div>
          {byStatus.map(({ label, count }) => {
            const c = STATUS_COLORS[label];
            return (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontSize: 9, marginBottom: 5, letterSpacing: "0.06em" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{label}</span>
                  <span style={{ color: c, textShadow: `0 0 8px ${c}` }}>{count}</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, background: c, boxShadow: `0 0 8px ${c}`, borderRadius: 4, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
              </div>
            );
          })}
        </Card3D>

        {/* Avg score by role */}
        <Card3D color="cyan" style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#00E5FF", letterSpacing: "0.1em", marginBottom: 16 }}>AVG SCORE BY ROLE</div>
          {byJob.map(({ job, avg, count }) => (
            <div key={job} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontSize: 9, marginBottom: 5 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "65%" }}>{job}</span>
                <span style={{ color: "#00E5FF", textShadow: "0 0 8px #00E5FF" }}>{avg} · {count} apps</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ height: "100%", width: `${(avg / maxAvg) * 100}%`, background: "linear-gradient(90deg, #00E5FF, #7C3AED)", boxShadow: "0 0 8px #00E5FF", borderRadius: 4, transition: "width 0.8s" }} />
              </div>
            </div>
          ))}
        </Card3D>

        {/* 3D bar chart */}
        <Card3D color="amber" style={{ padding: 20, gridColumn: "span 2" }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#FBBF24", letterSpacing: "0.1em", marginBottom: 16 }}>SCORE DISTRIBUTION</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120, padding: "0 10px" }}>
            {scoreRanges.map(([range, lo, hi, color]) => {
              const count = candidates.filter(c => c.score >= lo && c.score <= hi).length;
              const pct = count / total;
              return (
                <div key={range} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontFamily: "'Orbitron'", fontSize: 12, fontWeight: 900, color, textShadow: `0 0 10px ${color}` }}>{count}</div>
                  <div style={{ width: "100%", position: "relative", height: 70 }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${Math.max(pct * 100, 5)}%`, background: color, boxShadow: `0 0 15px ${color}80`, transition: "height 0.8s cubic-bezier(0.16,1,0.3,1)", transformOrigin: "bottom" }}>
                      <div style={{ position: "absolute", top: -3, left: 0, right: 0, height: 3, background: color, filter: "brightness(1.5)", boxShadow: `0 -2px 8px ${color}` }} />
                      <div style={{ position: "absolute", bottom: 0, right: -4, width: 4, height: "100%", background: `${color}66`, transform: "skewY(-1deg)", transformOrigin: "bottom" }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: `${color}88`, letterSpacing: "0.05em" }}>{range}</div>
                </div>
              );
            })}
          </div>
        </Card3D>
      </div>
    </div>
  );
}
