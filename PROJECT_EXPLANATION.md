# Assignment 02: Mind Mapping Studio - Project Explanation

## 1. Executive Summary
**Mind Mapping Studio** is a modern, high-performance web application built using **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**. It provides an interactive canvas where users can visually map out complex ideas, study schedules, business strategies, and project architectures using customizable draggable nodes and dynamic vector (SVG) connection lines.

The application operates completely on the client-side using browser **LocalStorage** for data persistence, rendering high-resolution PNG exports, and generating JSON payloads for backup and file sharing.

---

## 2. Target Audience & Practical Utility
- **BTech & CS Students:** Focuses on canvas coordinate geometry, dynamic graph data structures (nodes & edges), SVG Bezier paths, and React state management.
- **Business & Management Students:** Provides pre-built starter templates for SWOT Analysis, Product Launch Strategies, and Brainstorming.

---

## 3. Key Architecture & Features

### A. Dashboard & Project Management
- **Saved Maps Grid:** Displays mind maps with metadata (node count, line count, category, last updated date).
- **Search & Category Filters:** Live text search filtering across map titles, descriptions, and category tags.
- **Starter Templates:** 1-click loading for Study Planner, SWOT Analysis, and Brainstorm Maps.

### B. Infinite Interactive Canvas
- **Dynamic Pan & Zoom:** Scroll wheel zoom (0.3x to 2.5x) and mouse pan dragging for an infinite workspace experience.
- **Grid Backdrop Modes:** Customizable dot grid, line grid, or plain canvas backdrops.
- **Canvas Search:** Highlight glow focus animation for nodes matching search queries.

### C. Node System
- **Dynamic Shapes:** Rectangle, Soft Rounded Card, Pill, Circle/Ellipse, Diamond, and Cloud Bubble.
- **Color Palettes:** Curated color themes (Slate, Blue, Indigo, Emerald, Amber, Rose, Purple, Teal, Cyan).
- **Inline Text Editing:** Double-click node title to edit text directly on canvas.
- **Rich Notes Attachment:** Expandable drawer for attaching multi-line notes, code snippets, and study checklists.

### D. Dynamic SVG Connections
- **Line Styles:** Curved Cubic Bezier, Straight Lines, and Step / Orthogonal Lines.
- **Arrowhead Controls:** None, Forward, Backward, and Bidirectional arrow markers.
- **Stroke Patterns:** Solid, Dashed, and Dotted lines with custom color pickers and text labels.

### E. Storage, History & Export
- **Undo / Redo Stack:** Full history stack supporting Ctrl+Z and Ctrl+Y state restoration.
- **PNG Canvas Snapshots:** Export high-definition PNG images using `html-to-image`.
- **JSON Import / Export:** Export maps to `.json` files and import external JSON mind maps cleanly.

---

## 4. Environment & Deployment Setup
The application is pre-configured with environment variables in `.env` and deployment manifests (`vercel.json`, `netlify.toml`). Production builds are executed via `npm run build` targeting `dist/`.
