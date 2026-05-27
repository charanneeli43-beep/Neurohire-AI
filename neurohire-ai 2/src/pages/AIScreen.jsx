// ──────────────────────────────────────────────
//  NeuroHire AI  ·  AI Screening Page
// ──────────────────────────────────────────────

import { useState } from "react";
import { callClaude, parseJsonResponse } from "../api/claude";
import Card3D from "../components/ui/Card3D";
import Btn from "../components/ui/Btn";
import { PageHeader } from "../components/ui/atoms";

export default function AIScreen({ candidates, setCandidates }) {
  const [sel, setSel] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkRes, setBulkRes] = useState({});

  const screen = async () => {
    if (!sel || !jd) return;
    setLoading(true);
    setResult("");
    const c = candidates.find(x => x.id === sel);
    const text = await callClaude(
      [{ role: "user", content: `Candidate: ${c.name}, Role: ${c.role}, Exp: ${c.experience}, Skills: ${c.skills.join(", ")}\n\nJob Description:\n${jd}\n\nProvide:\n1. Match Score (0-100)\n2. Top 3 Strengths\n3. 2 Key Gaps\n4. Recommendation (Proceed/Hold/Reject)\n5. One-line summary` }],
      "Expert AI talent screener. Be direct, structured, and data-driven."
    );
    setResult(text);
    setLoading(false);
  };

  const bulk = async () => {
    if (!jd) return;
    setBulkLoading(true);
    const res = {};
    for (const c of candidates.slice(0, 5)) {
      const text = await callClaude(
        [{ role: "user", content: `Quick screen: ${c.name} (${c.role}, ${c.experience}, ${c.skills.join(", ")})\nJD: ${jd}\nReturn JSON only: {"score":0-100,"recommendation":"Proceed|Hold|Reject","reason":"<12 words"}` }],
        "Return only valid JSON, no markdown."
      );
      res[c.id] = parseJsonResponse(text, { score: 0, recommendation: "Error", reason: "Parse failed" });
    }
    setBulkRes(res);
    setCandidates(prev =>
      prev.map(c =>
        res[c.id]
          ? { ...c, score: res[c.id].score, status: res[c.id].recommendation === "Proceed" ? "shortlisted" : res[c.id].recommendation === "Reject" ? "rejected" : "review" }
          : c
      )
    );
    setBulkLoading(false);
  };

  const recColor = r =>
    r === "Proceed" ? "#00E5FF" : r === "Reject" ? "#FF2D78" : "#FBBF24";

  return (
    <div className="fade-up">
      <PageHeader label="// NEURAL ANALYSIS / CLAUDE AI" title="AI SCREENING" />

      {/* JD input */}
      <Card3D color="cyan" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#00E5FF", letterSpacing: "0.12em", marginBottom: 10 }}>
          ◆ JOB DESCRIPTION INPUT
        </div>
        <textarea
          placeholder="Paste the full job description to enable neural AI screening…"
          value={jd}
          onChange={e => setJd(e.target.value)}
          rows={4}
          style={{ resize: "vertical" }}
        />
      </Card3D>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {/* Single */}
        <Card3D color="cyan" style={{ padding: 18 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#00E5FF", letterSpacing: "0.1em", marginBottom: 14 }}>SINGLE DEEP SCREEN</div>
          <select value={sel} onChange={e => setSel(e.target.value)} style={{ marginBottom: 12 }}>
            <option value="">— Select Candidate —</option>
            {candidates.map(c => <option key={c.id} value={c.id}>{c.name} / {c.role}</option>)}
          </select>
          <Btn onClick={screen} disabled={loading || !sel || !jd} color="cyan" style={{ width: "100%" }}>
            {loading ? "⟳ NEURAL SCAN…" : "▶ DEEP SCREEN"}
          </Btn>
        </Card3D>

        {/* Bulk */}
        <Card3D color="purple" style={{ padding: 18 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#A78BFA", letterSpacing: "0.1em", marginBottom: 8 }}>BULK NEURAL SCREEN</div>
          <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 12, lineHeight: 1.8 }}>
            Auto-score all candidates and update pipeline status based on JD match analysis.
          </div>
          <Btn onClick={bulk} disabled={bulkLoading || !jd} color="purple" style={{ width: "100%" }}>
            {bulkLoading ? "⟳ PROCESSING…" : "⚡ SCREEN ALL"}
          </Btn>
          {Object.keys(bulkRes).length > 0 && (
            <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
              {Object.entries(bulkRes).map(([id, r]) => {
                const c = candidates.find(x => x.id === id);
                const col = recColor(r.recommendation);
                return (
                  <div key={id} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 10 }}>{c?.name}</span>
                    <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: col, textShadow: `0 0 8px ${col}` }}>
                      {r.score} · {r.recommendation}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card3D>
      </div>

      {/* Result panel */}
      {(loading || result) && (
        <Card3D color="cyan" style={{ padding: 22, background: "rgba(0,0,0,0.6)" }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#00E5FF", letterSpacing: "0.12em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", boxShadow: "0 0 8px #00E5FF" }} className={loading ? "blink" : ""} />
            NEURAL ANALYSIS OUTPUT
          </div>
          {loading
            ? <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 12, color: "rgba(0,229,255,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="blink">█</span> Scanning candidate against neural model…
              </div>
            : <pre style={{ whiteSpace: "pre-wrap", fontFamily: "'Share Tech Mono'", fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.9 }}>{result}</pre>
          }
        </Card3D>
      )}
    </div>
  );
}
