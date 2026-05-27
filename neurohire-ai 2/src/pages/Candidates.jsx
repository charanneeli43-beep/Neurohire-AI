// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Candidates Page
// ──────────────────────────────────────────────

import { useState } from "react";
import Card3D from "../components/ui/Card3D";
import Btn from "../components/ui/Btn";
import { HoloTag, ScoreDisc, StatusChip, PageHeader } from "../components/ui/atoms";

const FILTERS = ["all", "review", "shortlisted", "interview", "rejected"];

export default function Candidates({ candidates, setCandidates, jobs, setActive }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", experience: "", location: "", skills: "" });

  const filtered = candidates.filter(c => {
    const mf = filter === "all" || c.status === filter;
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  const addCandidate = () => {
    if (!form.name) return;
    setCandidates(prev => [
      {
        id: `c${Date.now()}`,
        name: form.name,
        role: form.role || "General",
        email: form.email,
        score: Math.floor(Math.random() * 30 + 60),
        status: "review",
        jobId: jobs[0]?.id || "",
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        experience: form.experience || "N/A",
        location: form.location || "N/A",
      },
      ...prev,
    ]);
    setForm({ name: "", role: "", email: "", experience: "", location: "", skills: "" });
    setShowAdd(false);
  };

  const updateStatus = (id, status) =>
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c));

  return (
    <div className="fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 0 }}>
        <PageHeader label="// TALENT POOL / PROFILES" title="CANDIDATES" />
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          <Btn onClick={() => setActive("screen")} color="purple">◆ AI SCREEN</Btn>
          <Btn onClick={() => setShowAdd(!showAdd)} color="cyan">+ ADD</Btn>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="Search name or role…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 200 }} />
        <div style={{ display: "flex", gap: 3 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="btn-3d"
              style={{
                background: filter === f ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${filter === f ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: filter === f ? "#00E5FF" : "rgba(255,255,255,0.4)",
                borderRadius: 6, padding: "7px 12px", fontSize: 11,
                fontFamily: "'Share Tech Mono'", letterSpacing: "0.05em", textTransform: "uppercase",
                boxShadow: filter === f ? "0 0 12px rgba(0,229,255,0.15), 0 3px 0 rgba(0,229,255,0.3)" : "0 2px 0 rgba(0,0,0,0.4)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <Card3D color="purple" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 11, color: "#A78BFA", letterSpacing: "0.1em", marginBottom: 12 }}>ADD CANDIDATE</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[["name","Full Name *"],["role","Role"],["email","Email"],["experience","Experience"],["location","Location"],["skills","Skills (csv)"]].map(([k, ph]) => (
              <input key={k} placeholder={ph} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={addCandidate} color="purple">ADD</Btn>
            <Btn onClick={() => setShowAdd(false)} color="cyan" variant="outline">CANCEL</Btn>
          </div>
        </Card3D>
      )}

      {/* List */}
      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map((c, i) => (
          <Card3D key={c.id} color="cyan" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, animationDelay: `${i * 0.04}s` }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Share Tech Mono'", fontSize: 12, color: "#A78BFA", flexShrink: 0, boxShadow: "0 0 12px rgba(124,58,237,0.2)" }}>
              {c.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{c.role} · {c.experience} · {c.location}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                {c.skills.slice(0, 3).map(s => <HoloTag key={s} color="purple">{s}</HoloTag>)}
              </div>
            </div>
            <ScoreDisc score={c.score} />
            <StatusChip status={c.status} />
            <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)} style={{ width: "auto", fontSize: 11, padding: "6px 8px" }}>
              {["review","shortlisted","interview","rejected"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Card3D>
        ))}
        {filtered.length === 0 && (
          <Card3D color="purple" style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
              // NO CANDIDATES FOUND
            </div>
          </Card3D>
        )}
      </div>
    </div>
  );
}
