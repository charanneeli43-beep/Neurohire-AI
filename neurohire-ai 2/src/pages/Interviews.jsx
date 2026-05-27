// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Interview Generator Page
// ──────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { callClaude, parseJsonResponse } from "../api/claude";
import Card3D from "../components/ui/Card3D";
import Btn from "../components/ui/Btn";
import { HoloTag, PageHeader } from "../components/ui/atoms";

const LEVEL_DATA = {
  Easy:   ["#22D3EE", "green"],
  Medium: ["#FBBF24", "amber"],
  Hard:   ["#FF2D78", "pink"],
};

export default function Interviews({ candidates, jobs }) {
  const [selC, setSelC] = useState("");
  const [selJ, setSelJ] = useState("");
  const [type, setType] = useState("technical");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  const generate = async () => {
    setLoading(true);
    setQuestions([]);
    const c = candidates.find(x => x.id === selC);
    const j = jobs.find(x => x.id === selJ);
    const text = await callClaude(
      [{ role: "user", content: `Generate ${count} ${type} interview questions for:\nCandidate: ${c ? `${c.name}, ${c.role}, ${c.experience}, ${c.skills.join(", ")}` : "software professional"}\nRole: ${j ? j.title : "technical role"}\nReturn JSON only: [{"q":"...","level":"Easy|Medium|Hard","category":"...","hint":"..."}]` }],
      "Expert interviewer. Return only valid JSON arrays, no markdown."
    );
    setQuestions(
      parseJsonResponse(text, [{ q: "Describe your most impactful technical project.", level: "Medium", category: "General", hint: "Assess depth, ownership, and impact." }])
    );
    setLoading(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    const nc = [...chat, { role: "user", content: msg }];
    setChat(nc);
    setChatLoading(true);
    const text = await callClaude(nc, "Helpful hiring assistant. Be concise and practical.");
    setChat([...nc, { role: "assistant", content: text }]);
    setChatLoading(false);
  };

  return (
    <div className="fade-up">
      <PageHeader label="// AI-GENERATED / INTERVIEW SUITE" title="INTERVIEW KIT" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {/* Configure */}
        <Card3D color="cyan" style={{ padding: 18 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: 10, color: "#00E5FF", letterSpacing: "0.1em", marginBottom: 14 }}>CONFIGURE SESSION</div>
          <div style={{ display: "grid", gap: 10 }}>
            <select value={selC} onChange={e => setSelC(e.target.value)}>
              <option value="">Candidate (optional)</option>
              {candidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={selJ} onChange={e => setSelJ(e.target.value)}>
              <option value="">Job Role (optional)</option>
              {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <select value={type} onChange={e => setType(e.target.value)}>
                {["technical", "behavioral", "situational", "mixed"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={count} onChange={e => setCount(Number(e.target.value))}>
                {[3, 5, 8, 10].map(n => <option key={n} value={n}>{n} questions</option>)}
              </select>
            </div>
            <Btn onClick={generate} disabled={loading} color="cyan" style={{ width: "100%" }}>
              {loading ? "⟳ GENERATING…" : "✦ GENERATE QUESTIONS"}
            </Btn>
          </div>
        </Card3D>

        {/* Chat */}
        <Card3D color="purple" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(124,58,237,0.2)", fontFamily: "'Orbitron'", fontSize: 10, color: "#A78BFA", letterSpacing: "0.1em" }}>AI HIRING CHAT</div>
          <div ref={chatRef} style={{ flex: 1, padding: 12, overflowY: "auto", maxHeight: 200, minHeight: 120, display: "flex", flexDirection: "column", gap: 8 }}>
            {chat.length === 0 && (
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "center", paddingTop: 20 }}>
                // ASK ANYTHING ABOUT HIRING
              </div>
            )}
            {chat.map((m, i) => (
              <div key={i} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, lineHeight: 1.6, background: m.role === "user" ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${m.role === "user" ? "rgba(0,229,255,0.3)" : "rgba(255,255,255,0.06)"}`, color: m.role === "user" ? "#00E5FF" : "rgba(255,255,255,0.7)", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", fontFamily: m.role === "assistant" ? "'Share Tech Mono'" : "'Rajdhani'", boxShadow: m.role === "user" ? "0 0 15px rgba(0,229,255,0.1)" : "none" }}>
                {m.content}
              </div>
            ))}
            {chatLoading && <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "rgba(0,229,255,0.4)" }}><span className="blink">█</span> thinking…</div>}
          </div>
          <div style={{ borderTop: "1px solid rgba(124,58,237,0.2)", display: "flex" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask about hiring strategies…" style={{ flex: 1, borderRadius: 0, border: "none", borderRight: "1px solid rgba(124,58,237,0.3)" }} />
            <button onClick={sendChat} style={{ background: "rgba(0,229,255,0.1)", border: "none", color: "#00E5FF", padding: "0 16px", fontWeight: 700, fontSize: 16 }}>↑</button>
          </div>
        </Card3D>
      </div>

      {loading && (
        <Card3D color="cyan" style={{ padding: 24, textAlign: "center" }}>
          <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "rgba(0,229,255,0.5)", letterSpacing: "0.1em" }}>
            <span className="blink">█</span> CRAFTING NEURAL QUESTIONS…
          </div>
        </Card3D>
      )}

      {questions.length > 0 && (
        <div style={{ display: "grid", gap: 8 }}>
          {questions.map((q, i) => {
            const [lc, lcolor] = LEVEL_DATA[q.level] || ["#00E5FF", "cyan"];
            return (
              <Card3D key={i} color={lcolor} style={{ padding: "16px 18px", display: "flex", gap: 14, animationDelay: `${i * 0.06}s` }}>
                <div style={{ fontFamily: "'Orbitron'", fontSize: 22, fontWeight: 900, color: lc, opacity: 0.4, minWidth: 36, textShadow: `0 0 10px ${lc}` }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <HoloTag color={lcolor}>{q.level}</HoloTag>
                    <HoloTag color="cyan">{q.category}</HoloTag>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{q.q}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "rgba(255,255,255,0.35)", borderLeft: "2px solid rgba(255,255,255,0.1)", paddingLeft: 10 }}>
                    → {q.hint}
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      )}
    </div>
  );
}
