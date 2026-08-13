# 🧠 Mind Mapping Studio - Assignment 02

An interactive, portfolio-worthy visual mind-mapping application built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **SVG Canvas Graphics**.

![Mind Mapping Studio Banner](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Deployment-Ready-emerald?style=for-the-badge)

---

## 📌 Project Overview
**Mind Mapping Studio** allows users to organize ideas, study plans, business strategies, and system architectures using draggable nodes and dynamic SVG vector connections. It features a complete project dashboard, infinite pan/zoom canvas, starter templates, undo/redo history, local storage auto-saving, and high-resolution PNG & JSON export options.

---

## ✨ Features Checklist

### 1. Dashboard & Map Management
- [x] Saved mind maps grid with search and category filters.
- [x] Create new mind map modal with starter layout selection.
- [x] Open, duplicate, star favorite, and delete saved maps.
- [x] LocalStorage persistence for zero data loss.

### 2. Infinite Interactive Canvas
- [x] Infinite workspace with smooth scroll wheel zoom (0.3x to 2.5x) and mouse pan drag.
- [x] Canvas grid background switcher (Dots, Lines, None).
- [x] Live node search filter with highlight glow effect.

### 3. Customizable Node System
- [x] Draggable nodes with smooth position calculation.
- [x] Inline double-click title editing on canvas.
- [x] 6 Dynamic node shapes (Rectangle, Soft Card, Pill, Circle, Diamond, Cloud Bubble).
- [x] 9 Curated color palettes (Slate, Blue, Indigo, Emerald, Amber, Rose, Purple, Teal, Cyan).
- [x] Expandable rich notes attachment drawer per node.

### 4. Dynamic SVG Line Connections
- [x] Dynamic connection drawing between node handles.
- [x] 3 Connection line styles: Cubic Bezier Curved, Straight, and Step/Orthogonal.
- [x] Arrowhead direction controls (None, Forward, Backward, Bidirectional).
- [x] Stroke patterns (Solid, Dashed, Dotted) with custom text labels.

### 5. Starter Templates & Export Tools
- [x] 3+ Built-in starter templates (**Study Planner**, **SWOT Analysis**, **Brainstorm Map**).
- [x] Export high-resolution PNG image snapshots using `html-to-image`.
- [x] Export mind maps as `.json` files & Import JSON back into workspace.
- [x] Full Undo / Redo history state stack (`Ctrl+Z` / `Ctrl+Y`).
- [x] Light / Dark mode theme switcher.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Lucide Icons, Glassmorphism design system
- **Export Utilities:** `html-to-image`, `canvas-confetti`
- **State Management:** React Context API, Custom Hooks, History Stack
- **Persistence:** Browser `localStorage` API

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js (v18+ or v24 LTS recommended)
- npm or yarn

### Installation Commands
```bash
# 1. Clone repository or navigate to directory
cd assignment7.2

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Environment Variables Configuration

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE="Mind Mapping Studio"
VITE_APP_ENV="production"
VITE_STORAGE_KEY="mindmap_studio_saved_maps"
VITE_ENABLE_SIMULATED_COLLAB="true"
```

---

## 📦 Production Deployment

### 1. Build Verification
```bash
npm run build
```
This generates the optimized static bundle inside the `dist/` directory.

### 2. Deploy to Vercel
- Manifest `vercel.json` is included.
- Connect your GitHub repository to Vercel.
- Vercel automatically detects Vite and deploys.

### 3. Deploy to Netlify
- Manifest `netlify.toml` is included.
- Build command: `npm run build`
- Publish directory: `dist`

---

## 📝 Answers to Analysis Questions (Assignment Page 3)

### 1. What is a Mind Map?
A **Mind Map** is a visual diagram used to organize information around a central concept. It models knowledge non-linearly using connected nodes, sub-branches, shapes, and colors to reflect natural cognitive thought patterns.

### 2. Why are interactive mind maps more useful than traditional notes?
Interactive mind maps provide dynamic spatial re-organization, infinite canvas space, easy drag-and-drop structural updates, instant digital backup, and visual graph relationships that traditional linear text notes cannot match.

### 3. Which feature was the most challenging to build?
Computing smooth **coordinate math for SVG Bezier connection lines** during infinite canvas zoom and pan dragging. Translating mouse screen coordinates into real graph space required matrix scaling and dynamic control point calculations.

### 4. How can this application be improved in the future?
Future enhancements include real-time WebSocket multi-user collaboration, LLM-powered AI mind map generation from prompts, and cloud database synchronization.

### 5. Which React concepts did you use during development?
React Context API, Custom Hooks (`useMindMap`), `useRef` for canvas measurements, `useCallback`/`useMemo` performance optimizations, controlled forms, and SVG declarative rendering.

---

## 📄 License & Course Submission
Submitted as **Assignment 02: Mind Mapping Studio**.
