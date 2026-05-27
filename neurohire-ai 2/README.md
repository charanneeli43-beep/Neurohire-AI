# 🧠 NeuroHire AI

> AI-powered recruitment platform with holographic 3D UI — built with React + Claude AI

![NeuroHire AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-blueviolet?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)

---

## ✨ Features

| Module | Description |
|---|---|
| **Dashboard** | Real-time KPIs, hiring funnel, candidate pipeline overview |
| **Job Board** | Post, pause, and manage open roles |
| **Candidates** | Full talent pool with filtering, search, status management |
| **AI Screen** | Single deep-screen or bulk-screen candidates using Claude AI |
| **Interviews** | AI-generated tailored questions + live hiring chat assistant |
| **Analytics** | 3D score distribution, pipeline stages, role benchmarks |

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

> **Note:** The app calls the Anthropic API directly from the browser.
> In production, proxy this through your backend to protect credentials.

## 📁 Project Structure

```
neurohire-ai/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component + routing
    ├── index.css           # Global styles + animations
    ├── api/
    │   └── claude.js       # Anthropic API client
    ├── data/
    │   └── constants.js    # Sample data + config
    ├── hooks/
    │   └── useStorage.js   # Persistent storage hook
    ├── components/
    │   ├── ui/
    │   │   ├── HoloGrid.jsx  # Animated 3D background
    │   │   ├── Card3D.jsx    # 3D holographic card
    │   │   ├── Btn.jsx       # 3D button
    │   │   └── atoms.jsx     # HoloTag, ScoreDisc, StatusChip, PageHeader
    │   └── layout/
    │       └── Sidebar.jsx   # Navigation sidebar + rotating cube logo
    └── pages/
        ├── Dashboard.jsx
        ├── JobBoard.jsx
        ├── Candidates.jsx
        ├── AIScreen.jsx
        ├── Interviews.jsx
        └── Analytics.jsx
```

## 🎨 Design System

- **Fonts:** Orbitron (display) · Rajdhani (body) · Share Tech Mono (code/labels)
- **Colors:** Cyan `#00E5FF` · Purple `#A78BFA` · Pink `#FF2D78` · Amber `#FBBF24`
- **3D Effects:** CSS `perspective`, `rotateX/Y`, `preserve-3d`, `translateZ`
- **Background:** Animated holographic grid + radial glow + scanning beam

## 🤖 AI Integration

Claude claude-sonnet-4-20250514 powers three features:

1. **Deep Screen** — Structured candidate evaluation vs. job description
2. **Bulk Screen** — Auto-scores + updates pipeline for all candidates
3. **Interview Generator** — Tailored question sets as structured JSON
4. **Hiring Chat** — Freeform AI assistant for any hiring question

## 🛠 Tech Stack

- **React 18** with hooks (no class components)
- **Vite 5** for fast dev + build
- **Anthropic API** (`claude-sonnet-4-20250514`)
- **Pure CSS** — no UI library, all custom 3D effects
- **localStorage / window.storage** for data persistence

## 📝 License

MIT — build freely, hire smarter.
