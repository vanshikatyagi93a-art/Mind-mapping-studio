import React, { useState } from 'react';
import { useMindMap } from '../../context/MindMapContext';
import {
  MousePointer,
  GitCommit,
  PlusCircle,
  Hand,
  Sparkles,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Search,
  Trash2,
  Sliders,
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const {
    toolMode,
    setToolMode,
    gridStyle,
    setGridStyle,
    zoomLevel,
    setZoomLevel,
    resetView,
    autoArrange,
    canUndo,
    canRedo,
    undo,
    redo,
    addNode,
    deleteSelected,
    selectedNodeIds,
    selectedConnectionId,
    setInspectorOpen,
    inspectorOpen,
    searchQuery,
    setSearchQuery,
  } = useMindMap();

  const [searchOpen, setSearchOpen] = useState(false);

  const hasSelection = selectedNodeIds.length > 0 || selectedConnectionId !== null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-1.5 p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-all">
      
      <div className="flex items-center space-x-1 pr-2 border-r border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setToolMode('select')}
          className={`p-2 rounded-xl text-xs font-medium transition-all ${
            toolMode === 'select'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Select & Drag Tool (V)"
        >
          <MousePointer className="w-4 h-4" />
        </button>

        <button
          onClick={() => setToolMode('connect')}
          className={`p-2 rounded-xl text-xs font-medium transition-all ${
            toolMode === 'connect'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Connect Mode - Drag line between nodes (C)"
        >
          <GitCommit className="w-4 h-4" />
        </button>

        <button
          onClick={() => addNode()}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          title="Add New Idea Node (N)"
        >
          <PlusCircle className="w-4 h-4" />
        </button>

        <button
          onClick={() => setToolMode('pan')}
          className={`p-2 rounded-xl text-xs font-medium transition-all ${
            toolMode === 'pan'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Pan Canvas Tool (H)"
        >
          <Hand className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 px-1 border-r border-slate-200 dark:border-slate-800">
        <button
          onClick={autoArrange}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
          title="Auto-Arrange Mindmap Tree Layout (A)"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded-xl transition-all ${
            canUndo
              ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded-xl transition-all ${
            canRedo
              ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {hasSelection && (
        <div className="flex items-center space-x-1 px-1 border-r border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setInspectorOpen(!inspectorOpen)}
            className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-all"
            title="Inspect Selected Node Properties"
          >
            <Sliders className="w-4 h-4" />
          </button>
          <button
            onClick={deleteSelected}
            className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all"
            title="Delete Selected Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center space-x-1 px-1 border-r border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.3, z - 0.1))}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span
          onClick={resetView}
          className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 cursor-pointer hover:text-indigo-600"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.1))}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={resetView}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Fit View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 pl-1">
        <button
          onClick={() => {
            if (gridStyle === 'dots') setGridStyle('lines');
            else if (gridStyle === 'lines') setGridStyle('none');
            else setGridStyle('dots');
          }}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all capitalize"
          title={`Canvas Grid: ${gridStyle}`}
        >
          <Grid className="w-4 h-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 rounded-xl transition-all ${
              searchQuery ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Search Nodes in Canvas"
          >
            <Search className="w-4 h-4" />
          </button>

          {searchOpen && (
            <div className="absolute bottom-12 right-0 w-60 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="Find node text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
