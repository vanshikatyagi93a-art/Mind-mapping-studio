# 🧠 Mind Mapping Studio - Project Report & Submission Document

**Course:** Assignment 02: Mind Mapping Studio  
**Institution:** The AI School  
**Student Name:** Vanshika Tyagi  
**Repository:** [https://github.com/vanshikatyagi93a-art/Mind-mapping-studio](https://github.com/vanshikatyagi93a-art/Mind-mapping-studio)  
**Live Application (Netlify):** [https://6a7de64ecb069f403ddc9dc6--voluble-pasca-bf7ac6.netlify.app/](https://6a7de64ecb069f403ddc9dc6--voluble-pasca-bf7ac6.netlify.app/)  

---

## 📌 1. Project Overview & Objective

**Mind Mapping Studio** is an interactive, browser-based visual mapping application designed to help users non-linearly structure ideas, study guides, system architectures, and business workflows.

Built using modern web technologies (**React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**), the application features an infinite pan/zoom canvas, drag-and-drop node positioning, customizable node shapes and color palettes, dynamic vector SVG connection lines (Cubic Bezier, Straight, Step), starter templates, full undo/redo history, local storage auto-saving, and high-resolution PNG snapshot exports.

---

## 🔗 2. Essential Links

| Resource | URL |
| :--- | :--- |
| 🌐 **Live Web Application (Netlify)** | [https://6a7de64ecb069f403ddc9dc6--voluble-pasca-bf7ac6.netlify.app/](https://6a7de64ecb069f403ddc9dc6--voluble-pasca-bf7ac6.netlify.app/) |
| 💻 **GitHub Source Code Repository** | [https://github.com/vanshikatyagi93a-art/Mind-mapping-studio](https://github.com/vanshikatyagi93a-art/Mind-mapping-studio) |

---

## 🚀 3. Features & Implementation Checklist

### Core Features (Assignment Requirements)
- [x] **Dashboard Management:** Grid display of saved mind maps with live search, category filtering, duplicate, star favorite, and deletion tools.
- [x] **Create & Edit Maps:** Modal dialog to launch new mind maps with optional starter templates.
- [x] **Interactive Nodes:** Drag-and-drop node movement with real-time coordinate matrix tracking.
- [x] **Node Customization:** 6 custom node shapes (Rectangle, Soft Card, Pill, Circle, Diamond, Cloud) and 9 curated color palettes.
- [x] **SVG Connections:** Connect nodes with 3 line styles (Cubic Bezier curved, straight, step/orthogonal) and dynamic arrowhead direction markers.
- [x] **Infinite Canvas Workspace:** Mouse drag panning and smooth wheel zoom (0.3x to 2.5x) with customizable dot/line grid backgrounds.
- [x] **Local Storage Persistence:** Zero-latency auto-save to browser `localStorage`.
- [x] **Starter Templates:** 3 pre-built starter maps (**Study Planner**, **SWOT Analysis**, **Brainstorm Map**).

### Bonus & Advanced Features
- [x] **Undo / Redo History Stack:** Multi-step `Ctrl+Z` / `Ctrl+Y` history state restoration.
- [x] **PNG Image Snapshot Export:** High-res image generation via `html-to-image`.
- [x] **JSON Data Import & Export:** Backup maps as `.json` files and re-import external files.
- [x] **Rich Notes Drawer:** Expandable text drawer per node for detailed checklists and study notes.
- [x] **Node Search & Focus Glow:** Live keyword search with pulsing canvas highlight animations.
- [x] **Dark / Light Theme Switcher:** Complete glassmorphic UI design system supporting light and dark themes.

---

## 🛠️ 4. Technology Stack & Architecture

- **Frontend Framework:** React 19.0.0
- **Build Tool & Dev Server:** Vite 6.0
- **Type Safety:** TypeScript 5.0
- **Styling & UI Design:** Tailwind CSS v4, Lucide Icons, Glassmorphism design system
- **Export Engines:** `html-to-image`, `canvas-confetti`
- **State Management:** React Context API (`MindMapContext`), Custom Hooks (`useMindMap`), History Stack (`useHistory`)
- **Hosting & Deployment:** Netlify (Continuous Deployment from GitHub `main` branch)

---

## 📝 5. Analysis Questions & Solutions

### Q1: What is a Mind Map?
> **Answer:** A Mind Map is a visual diagram used to visually capture and organize information around a central theme or concept. Unlike traditional linear notes, mind maps structure ideas radiantly using connected nodes, color codes, shapes, and arrows, mimicking natural cognitive thought processes.

### Q2: Why are interactive mind maps more useful than traditional notes?
> **Answer:** Interactive mind maps provide infinite spatial reorganization, instant drag-and-drop relationship adjustments, infinite canvas pan/zoom, dynamic color coding, and instant digital backups. They allow users to synthesize complex relationships faster and retain information through spatial memory visual cues.

### Q3: Which feature was the most challenging to build?
> **Answer:** Computing smooth, real-time **coordinate math for SVG Bezier connection lines** during canvas pan and zoom transformations. Translating raw screen mouse coordinates into normalized graph space while adjusting control points for curved SVG paths required precise matrix scaling calculations.

### Q4: How can this application be improved in the future?
> **Answer:** Future roadmap enhancements include:
> 1. Real-time multi-user collaboration using WebSockets (WebRTC / Yjs).
> 2. AI-assisted mind map generation (generating nodes directly from text prompts using LLMs).
> 3. Cloud synchronization with backend database authentication (Firebase / Supabase).

### Q5: Which React concepts did you use during development?
> **Answer:**
> - **React Context API:** Global state provider for active mind map data and canvas settings.
> - **Custom Hooks (`useMindMap`, `useHistory`):** Encapsulating state manipulation, undo/redo stacks, and canvas transformations.
> - **`useRef` & `useCallback` / `useMemo`:** Optimizing drag event listeners, DOM snapshot bounding boxes, and SVG render pipelines without unnecessary re-renders.
> - **Declarative SVG Rendering:** Dynamically generating `<path>` elements from node handle coordinates.

---

## 🎓 Acknowledgements

Special thanks to **The AI School** for their guidance, task guidelines, and structured learning modules throughout this project.
