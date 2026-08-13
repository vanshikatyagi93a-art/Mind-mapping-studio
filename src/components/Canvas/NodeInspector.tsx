import React from 'react';
import { useMindMap } from '../../context/MindMapContext';
import type { NodeShape, NodeColorTheme } from '../../types';
import {
  X,
  Trash2,
  Plus,
  Sliders,
  Type,
  Palette,
  Shapes,
  FileText,
} from 'lucide-react';

const SHAPE_OPTIONS: { id: NodeShape; label: string }[] = [
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'rounded', label: 'Rounded Card' },
  { id: 'pill', label: 'Pill' },
  { id: 'circle', label: 'Circle' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'cloud', label: 'Cloud Bubble' },
];

const COLOR_OPTIONS: { id: NodeColorTheme; label: string; bg: string }[] = [
  { id: 'blue', label: 'Blue', bg: 'bg-blue-500' },
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-500' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-500' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-500' },
  { id: 'cyan', label: 'Cyan', bg: 'bg-cyan-500' },
  { id: 'slate', label: 'Slate', bg: 'bg-slate-500' },
];

const ICON_OPTIONS = [
  { id: 'Sparkles', label: 'Sparkles' },
  { id: 'GraduationCap', label: 'Education' },
  { id: 'ShieldAlert', label: 'Shield' },
  { id: 'Lightbulb', label: 'Idea' },
  { id: 'CheckCircle', label: 'Check' },
  { id: 'Folder', label: 'Folder' },
  { id: 'Code', label: 'Code' },
  { id: 'Globe', label: 'Web' },
  { id: 'Database', label: 'Database' },
  { id: 'Cpu', label: 'CPU' },
];

export const NodeInspector: React.FC = () => {
  const {
    inspectorOpen,
    setInspectorOpen,
    selectedNodeIds,
    activeMap,
    updateNode,
    deleteNode,
    addNode,
  } = useMindMap();

  if (!inspectorOpen || !activeMap || selectedNodeIds.length === 0) {
    return null;
  }

  const selectedNode = activeMap.nodes.find((n) => n.id === selectedNodeIds[0]);
  if (!selectedNode) return null;

  return (
    <aside className="fixed top-20 right-6 z-40 w-80 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-5 space-y-6 animate-in slide-in-from-right-5 duration-200">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Node Properties</h3>
        </div>
        <button
          onClick={() => setInspectorOpen(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-500" />
            <span>Node Title</span>
          </label>
          <input
            type="text"
            value={selectedNode.title}
            onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          />
        </div>

        <div>
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Detailed Notes & Ideas</span>
          </label>
          <textarea
            rows={4}
            value={selectedNode.notes || ''}
            onChange={(e) => updateNode(selectedNode.id, { notes: e.target.value })}
            placeholder="Add detailed description, references, or study notes..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Shapes className="w-3.5 h-3.5 text-purple-500" />
          <span>Node Shape</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SHAPE_OPTIONS.map((shp) => (
            <button
              key={shp.id}
              onClick={() => updateNode(selectedNode.id, { shape: shp.id })}
              className={`px-2 py-1.5 text-[11px] font-medium rounded-xl border transition-all text-center ${
                selectedNode.shape === shp.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {shp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Palette className="w-3.5 h-3.5 text-emerald-500" />
          <span>Color Theme</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_OPTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => updateNode(selectedNode.id, { colorTheme: col.id })}
              className={`flex items-center space-x-1.5 p-1.5 rounded-xl border transition-all ${
                selectedNode.colorTheme === col.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full ${col.bg}`} />
              <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 capitalize">{col.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Node Icon
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ICON_OPTIONS.map((ic) => (
            <button
              key={ic.id}
              onClick={() => updateNode(selectedNode.id, { icon: ic.id })}
              className={`px-2 py-1 text-[11px] rounded-lg border transition-all ${
                selectedNode.icon === ic.id
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {ic.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => addNode(undefined, selectedNode.id)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Child Node</span>
        </button>

        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>

    </aside>
  );
};
