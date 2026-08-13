import React from 'react';
import { useMindMap } from '../../context/MindMapContext';
import type { ConnectionType, LinePattern, ArrowDirection } from '../../types';
import { X, Trash2, GitCommit, Type, ArrowRight } from 'lucide-react';

export const ConnectionInspector: React.FC = () => {
  const {
    selectedConnectionId,
    setSelectedConnectionId,
    activeMap,
    updateConnection,
    deleteConnection,
  } = useMindMap();

  if (!selectedConnectionId || !activeMap) return null;

  const connection = activeMap.connections.find((c) => c.id === selectedConnectionId);
  if (!connection) return null;

  const fromNode = activeMap.nodes.find((n) => n.id === connection.fromNodeId);
  const toNode = activeMap.nodes.find((n) => n.id === connection.toNodeId);

  return (
    <div className="fixed top-20 right-6 z-40 w-80 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-5 space-y-5 animate-in slide-in-from-right-5 duration-200">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <GitCommit className="w-4 h-4 text-purple-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Connection Properties</h3>
        </div>
        <button
          onClick={() => setSelectedConnectionId(null)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs flex items-center justify-between">
        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[100px]">
          {fromNode?.title || 'Node A'}
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[100px]">
          {toNode?.title || 'Node B'}
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Line Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['curved', 'straight', 'step'] as ConnectionType[]).map((t) => (
            <button
              key={t}
              onClick={() => updateConnection(connection.id, { type: t })}
              className={`px-2 py-1.5 text-xs font-medium rounded-xl border capitalize transition-all ${
                connection.type === t
                  ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Stroke Pattern
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['solid', 'dashed', 'dotted'] as LinePattern[]).map((p) => (
            <button
              key={p}
              onClick={() => updateConnection(connection.id, { pattern: p })}
              className={`px-2 py-1.5 text-xs font-medium rounded-xl border capitalize transition-all ${
                connection.pattern === p
                  ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Arrow Direction
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['none', 'forward', 'backward', 'bidirectional'] as ArrowDirection[]).map((a) => (
            <button
              key={a}
              onClick={() => updateConnection(connection.id, { arrow: a })}
              className={`px-2 py-1.5 text-xs font-medium rounded-xl border capitalize transition-all ${
                connection.arrow === a
                  ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Type className="w-3.5 h-3.5 text-purple-500" />
          <span>Connection Label</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Depends on / Triggers"
          value={connection.label || ''}
          onChange={(e) => updateConnection(connection.id, { label: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <button
          onClick={() => deleteConnection(connection.id)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove Line</span>
        </button>
      </div>

    </div>
  );
};
