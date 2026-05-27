// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Job Board Page
// ──────────────────────────────────────────────

import { useState } from "react";
import Card3D from "../components/ui/Card3D";
import Btn from "../components/ui/Btn";
import { StatusChip, PageHeader } from "../components/ui/atoms";

export default function JobBoard({ jobs, setJobs }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", dept: "", location: "" });

  const addJob = () => {
    if (!form.title) return;
    setJobs(prev => [
      {
        id: `j${Date.now()}`,
        title: form.title,
        dept: form.dept || "General",
        location: form.location || "Remote",
        status: "active",
        applicants: 0,
        created: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setForm({ title: "", dept: "", location: "" });
    setShowAdd(false);
  };

  const toggleStatus = id =>
    setJobs(prev =>
      prev.map(j => j.id === id ? { ...j, status: j.status === "active" ? "paused" : "active" } : j)
    );

  const deleteJob = id => setJobs(prev => prev.filter(j => j.id !== id));

  const deptIcon = dept =>
    dept === "Engineering" ? "⚙" : dept === "Design" ? "◈" : "◎";

  return (
    <div className="fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 0 }}>
        <PageHeader label="// POSITIONS / OPEN ROLES" title="JOB BOARD" />
        <Btn onClick={() => setShowAdd(!showAdd)} color="cyan" style={{ marginBottom: 28 }}>
          + POST ROLE
        </Btn>
      </div>

      {showAdd && (
        <Card3D color="cyan" style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 11, color: "#00E5FF", letterSpacing: "0.1em", marginBottom: 14 }}>
            NEW POSITION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            <input placeholder="Job Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            <input placeholder="Department"  value={form.dept}  onChange={e => setForm(p => ({ ...p, dept: e.target.value }))} />
            <input placeholder="Location"    value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={addJob} color="cyan">PUBLISH ROLE</Btn>
            <Btn onClick={() => setShowAdd(false)} color="purple" variant="outline">CANCEL</Btn>
          </div>
        </Card3D>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {jobs.map((job, i) => (
          <Card3D
            key={job.id}
            color={job.status === "active" ? "cyan" : "purple"}
            style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, animationDelay: `${i * 0.05}s` }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, background: job.status === "active" ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${job.status === "active" ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, boxShadow: job.status === "active" ? "0 0 15px rgba(0,229,255,0.2)" : "none" }}>
              {deptIcon(job.dept)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Orbitron'", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{job.title}</div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
                {job.dept} · {job.location} · {job.created}
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "0 18px", borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: "'Orbitron'", fontSize: 26, fontWeight: 900, color: "#00E5FF", textShadow: "0 0 15px #00E5FF" }}>{job.applicants}</div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>APPLICANTS</div>
            </div>
            <StatusChip status={job.status} />
            <div style={{ display: "flex", gap: 6 }}>
              <Btn onClick={() => toggleStatus(job.id)} color="purple" style={{ fontSize: 11, padding: "7px 12px" }}>
                {job.status === "active" ? "PAUSE" : "RESUME"}
              </Btn>
              <Btn onClick={() => deleteJob(job.id)} color="pink" style={{ fontSize: 11, padding: "7px 10px" }}>✕</Btn>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
}
