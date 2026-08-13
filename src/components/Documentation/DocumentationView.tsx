import React from 'react';
import { BookOpen, CheckCircle2, HelpCircle, Layers, Server } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
      
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Assignment 02 Documentation & Q&A</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Mind Mapping Studio Documentation & Analysis
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Complete project writeup, architectural overview, deployment instructions, and detailed answers to the 5 analysis questions.
        </p>
      </div>

      <section className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">1. Project Overview & Scope</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Mind Mapping Studio - Visual Graph & Workspace</p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            <strong>Mind Mapping Studio</strong> is an interactive, browser-native web application designed to help users brainstorm, visualize, and structure ideas using draggable nodes and dynamic SVG connections. Inspired by professional visual diagramming platforms like Miro, XMind, and Whimsical, this project implements a graph-based data structure entirely on the client side with zero external backend dependencies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider text-indigo-500">Core Features Built</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Dashboard with saved map cards & category filters</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Infinite canvas with smooth wheel zoom & pan drag</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Draggable nodes with custom shapes & color palettes</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Dynamic SVG connections (Bezier, straight, step lines)</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Starter templates (Study Planner, SWOT Analysis, Brainstorm)</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>PNG high-res image export & JSON data import/export</span></li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider text-purple-500">Bonus Capabilities</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /><span>Rich notes attachment per node</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /><span>Undo/Redo state stack history</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /><span>Auto-arrange tree layout algorithm</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /><span>Canvas node search & highlight glow</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /><span>Light / Dark mode theme switcher</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">2. Answers to Assignment Analysis Questions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Required answers from Page 3 of Assignment PDF</p>
          </div>
        </div>

        <div className="space-y-4">
          
          <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 space-y-2">
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-xs flex items-center justify-center font-extrabold">1</span>
              <span>What is a Mind Map?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
              A <strong>Mind Map</strong> is a visual diagram used to visually organize information, ideas, concepts, and relationships around a central subject. Unlike linear text notes, a mind map models information as a non-linear graph hierarchy, connecting a central root idea to primary sub-topics, branches, and leaf nodes using colors, shapes, and directional edges.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 space-y-2">
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-xs flex items-center justify-center font-extrabold">2</span>
              <span>Why are interactive mind maps more useful than traditional notes?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
              Interactive digital mind maps offer significant cognitive and practical advantages over static pen-and-paper notes:
              <br />• <strong>Dynamic Spatial Re-organization:</strong> Drag-and-drop allows users to seamlessly move nodes as ideas evolve without messy erasing.
              <br />• <strong>Non-Linear Thinking:</strong> Mimics human brain association rather than rigid sequential lines of text.
              <br />• <strong>Scalability & Infinite Canvas:</strong> Users can pan and zoom into multi-level complex subjects without running out of paper space.
              <br />• <strong>Instant Persistence & Export:</strong> Digital maps can be stored in local storage, exported to PNG image snapshots for presentations, or saved as JSON for team sharing.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 space-y-2">
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-xs flex items-center justify-center font-extrabold">3</span>
              <span>Which feature was the most challenging to build?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
              The most technical challenge was implementing <strong>Smooth Coordinate Math for SVG Bezier Lines during Infinite Canvas Zoom & Pan</strong>:
              <br />• When scaling the canvas with <code>zoomLevel</code> and translating with <code>panOffset</code>, converting raw mouse screen coordinates (<code>clientX, clientY</code>) into real graph coordinate space required transformation matrix math.
              <br />• Computing real-time cubic Bezier control points (<code>C x1+dx y1, x2-dx y2, x2 y2</code>) ensured connection paths stayed attached to node centers even when dragging nodes dynamically across the canvas.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 space-y-2">
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-xs flex items-center justify-center font-extrabold">4</span>
              <span>How can this application be improved in the future?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
              Future roadmaps for Mind Mapping Studio include:
              <br />1. <strong>Real-time Multiplayer Collaboration:</strong> Integrating WebSockets or Yjs (CRDT) for multi-user live editing with cursors.
              <br />2. <strong>AI Mindmap Generation:</strong> Prompt-to-mindmap feature using LLMs to automatically expand nodes for study topics or business plans.
              <br />3. <strong>Cloud Sync & Backend:</strong> Adding Supabase/Firebase authentication for cross-device cloud persistence.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 space-y-2">
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-xs flex items-center justify-center font-extrabold">5</span>
              <span>Which React concepts did you use during development?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
              Key React architecture concepts utilized:
              <br />• <strong>React Context API & Custom Hooks:</strong> Centralized <code>MindMapContext</code> and <code>useMindMap</code> for global state management.
              <br />• <strong><code>useRef</code> & DOM Measurement:</strong> Accessing canvas viewport coordinates and measuring SVG paths.
              <br />• <strong><code>useCallback</code> & <code>useMemo</code>:</strong> Optimizing history stack pushes and filtering nodes without redundant re-renders.
              <br />• <strong>Controlled Component Forms:</strong> Inline title editing, inspector drawer property forms, and search query inputs.
              <br />• <strong>SVG & Declarative JSX Rendering:</strong> Dynamic rendering of vector paths and node components directly from array states.
            </p>
          </div>

        </div>
      </section>

      <section className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">3. Deployment & Environment Configuration</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Vercel & Netlify Production Deployment Setup</p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            The project is fully prepared for 1-click static site deployment on <strong>Vercel</strong>, <strong>Netlify</strong>, or <strong>GitHub Pages</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
            <div className="text-indigo-400 font-bold"># Environment Variables (.env)</div>
            <div>VITE_APP_TITLE="Mind Mapping Studio"</div>
            <div>VITE_APP_ENV="production"</div>
            <div>VITE_STORAGE_KEY="mindmap_studio_data"</div>
            <div>VITE_ENABLE_SIMULATED_COLLAB="true"</div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Included deployment manifests: <code>vercel.json</code> for Vercel SPA routing rewrites, <code>netlify.toml</code> for Netlify build triggers, and clean build script <code>npm run build</code>.
          </p>
        </div>
      </section>

    </div>
  );
};
