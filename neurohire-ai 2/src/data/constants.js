// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Constants & Sample Data
// ──────────────────────────────────────────────

export const MODEL = "claude-sonnet-4-20250514";

export const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export const SAMPLE_JOBS = [
  {
    id: "j1",
    title: "Senior ML Engineer",
    dept: "Engineering",
    location: "Remote",
    status: "active",
    applicants: 24,
    created: "2026-05-10",
  },
  {
    id: "j2",
    title: "Product Designer",
    dept: "Design",
    location: "Mumbai",
    status: "active",
    applicants: 18,
    created: "2026-05-08",
  },
  {
    id: "j3",
    title: "Backend Engineer",
    dept: "Engineering",
    location: "Bengaluru",
    status: "paused",
    applicants: 31,
    created: "2026-05-01",
  },
];

export const SAMPLE_CANDIDATES = [
  {
    id: "c1",
    name: "Priya Sharma",
    role: "ML Engineer",
    email: "priya@mail.com",
    score: 92,
    status: "shortlisted",
    jobId: "j1",
    skills: ["Python", "PyTorch", "MLOps"],
    experience: "6 yrs",
    location: "Pune",
  },
  {
    id: "c2",
    name: "Arjun Mehta",
    role: "ML Engineer",
    email: "arjun@mail.com",
    score: 78,
    status: "review",
    jobId: "j1",
    skills: ["TensorFlow", "Spark", "AWS"],
    experience: "4 yrs",
    location: "Mumbai",
  },
  {
    id: "c3",
    name: "Kavya Nair",
    role: "Product Designer",
    email: "kavya@mail.com",
    score: 88,
    status: "shortlisted",
    jobId: "j2",
    skills: ["Figma", "Prototyping", "Research"],
    experience: "5 yrs",
    location: "Bengaluru",
  },
  {
    id: "c4",
    name: "Rahul Singh",
    role: "Backend Engineer",
    email: "rahul@mail.com",
    score: 65,
    status: "rejected",
    jobId: "j3",
    skills: ["Go", "PostgreSQL", "Docker"],
    experience: "3 yrs",
    location: "Delhi",
  },
  {
    id: "c5",
    name: "Ananya Das",
    role: "ML Engineer",
    email: "ananya@mail.com",
    score: 85,
    status: "interview",
    jobId: "j1",
    skills: ["NLP", "LangChain", "FastAPI"],
    experience: "5 yrs",
    location: "Hyderabad",
  },
];

export const NAV_ITEMS = [
  { id: "dashboard",  label: "Overview",    icon: "⬡" },
  { id: "jobs",       label: "Jobs",        icon: "◈" },
  { id: "candidates", label: "Candidates",  icon: "◉" },
  { id: "screen",     label: "AI Screen",   icon: "◆" },
  { id: "interview",  label: "Interviews",  icon: "◇" },
  { id: "analytics",  label: "Analytics",   icon: "▦" },
];

export const COLORS = {
  cyan:   { hex: "#00E5FF", rgb: "0,229,255"   },
  purple: { hex: "#A78BFA", rgb: "124,58,237"  },
  pink:   { hex: "#FF2D78", rgb: "255,45,120"  },
  amber:  { hex: "#FBBF24", rgb: "251,191,36"  },
  green:  { hex: "#22D3EE", rgb: "34,211,238"  },
};

export const STATUS_COLOR_MAP = {
  active:      "cyan",
  shortlisted: "cyan",
  review:      "amber",
  interview:   "purple",
  rejected:    "pink",
  paused:      "cyan",
};
