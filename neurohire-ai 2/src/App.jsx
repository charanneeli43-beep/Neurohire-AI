// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Root Application Component
// ──────────────────────────────────────────────

import { useState } from "react";
import { SAMPLE_JOBS, SAMPLE_CANDIDATES } from "./data/constants";
import { useStorage } from "./hooks/useStorage";

import HoloGrid      from "./components/ui/HoloGrid";
import Sidebar        from "./components/layout/Sidebar";
import Dashboard      from "./pages/Dashboard";
import JobBoard       from "./pages/JobBoard";
import Candidates     from "./pages/Candidates";
import AIScreen       from "./pages/AIScreen";
import Interviews     from "./pages/Interviews";
import Analytics      from "./pages/Analytics";

const VIEWS = {
  dashboard:  Dashboard,
  jobs:       JobBoard,
  candidates: Candidates,
  screen:     AIScreen,
  interview:  Interviews,
  analytics:  Analytics,
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [jobs, setJobs]               = useStorage("nh-jobs-v3",       SAMPLE_JOBS);
  const [candidates, setCandidates]   = useStorage("nh-candidates-v3", SAMPLE_CANDIDATES);

  const View = VIEWS[active] || Dashboard;

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <HoloGrid />
      <Sidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", position: "relative", zIndex: 2 }}>
        <View
          jobs={jobs}
          setJobs={setJobs}
          candidates={candidates}
          setCandidates={setCandidates}
          setActive={setActive}
        />
      </main>
    </div>
  );
}
