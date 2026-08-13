import React, { useState } from 'react';
import { useMindMap } from '../context/MindMapContext';
import { exportCanvasAsPNG, exportMapAsJSON } from '../utils/export';
import {
  LayoutGrid,
  Network,
  LayoutTemplate,
  BookOpen,
  Sun,
  Moon,
  Save,
  Download,
  Plus,
  FileJson,
  FileImage,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    theme,
    toggleTheme,
    activeMap,
    saveCurrentMap,
    createNewMap,
  } = useMindMap();

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  const appTitle = import.meta.env.VITE_APP_TITLE || 'Mind Mapping Studio';
  const isProd = import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.PROD;

  const handleSave = () => {
    saveCurrentMap();
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleExportPNG = async () => {
    if (!activeMap) return;
    setExportDropdownOpen(false);
    await exportCanvasAsPNG('mindmap-canvas-viewport', activeMap.title);
  };

  const handleExportJSON = () => {
    if (!activeMap) return;
    setExportDropdownOpen(false);
    exportMapAsJSON(activeMap);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {appTitle}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {isProd ? 'Deployed' : 'v2.0'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interactive Visual Workspace</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'dashboard'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setViewMode('canvas')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'canvas'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Canvas Editor</span>
          </button>

          <button
            onClick={() => setViewMode('templates')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'templates'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => setViewMode('documentation')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'documentation'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Project Docs & Q&A</span>
          </button>
        </nav>

        <div className="flex items-center space-x-2">
          {viewMode === 'canvas' && activeMap && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saveStatus || 'Save'}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                {exportDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={handleExportPNG}
                      className="w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <FileImage className="w-4 h-4 text-emerald-500" />
                      <span>Export as PNG Image</span>
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <FileJson className="w-4 h-4 text-amber-500" />
                      <span>Export as JSON Data</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {viewMode === 'dashboard' && (
            <button
              onClick={() => createNewMap()}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 rounded-lg shadow-md shadow-indigo-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Mind Map</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
