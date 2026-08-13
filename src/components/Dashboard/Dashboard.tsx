import React, { useState, useRef } from 'react';
import { useMindMap } from '../../context/MindMapContext';
import { STARTER_TEMPLATES } from '../../utils/storage';
import { parseImportedJSON } from '../../utils/export';
import {
  Plus,
  Search,
  Star,
  Trash2,
  Copy,
  ExternalLink,
  Upload,
  Sparkles,
  Network,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    savedMaps,
    selectMap,
    createNewMap,
    duplicateMap,
    deleteMap,
    toggleFavorite,
    importMap,
    setViewMode,
  } = useMindMap();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'Education' | 'Business' | 'Creative'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('template-study-planner');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMaps = savedMaps.filter((map) => {
    const matchesSearch = map.title.toLowerCase().includes(search.toLowerCase()) || (map.description && map.description.toLowerCase().includes(search.toLowerCase()));
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && map.isFavorite;
    return matchesSearch && map.category === activeTab;
  });

  const totalNodesCount = savedMaps.reduce((acc, m) => acc + m.nodes.length, 0);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewMap(newTitle.trim() || undefined, selectedTemplateId);
    setShowCreateModal(false);
    setNewTitle('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const imported = parseImportedJSON(content);
        if (imported) {
          importMap(imported);
        } else {
          alert('Failed to parse JSON file. Please ensure it is a valid MindMap format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner & Stats Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mind Mapping Studio Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Organize Ideas, Build Workflows & Visual Graphs
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Create interactive mind maps with custom nodes, dynamic SVG connections, drag-and-drop mechanics, and instant local storage backup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Mind Map</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 font-medium text-sm border border-slate-700/80 transition-all"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Import JSON</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json" className="hidden" />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold">{savedMaps.length}</div>
              <div className="text-xs text-slate-400">Saved Projects</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold">{totalNodesCount}</div>
              <div className="text-xs text-slate-400">Total Idea Nodes</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold">{savedMaps.filter((m) => m.isFavorite).length}</div>
              <div className="text-xs text-slate-400">Starred Maps</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold">100% Local</div>
              <div className="text-xs text-slate-400">Browser Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Starter Templates Quick Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Starter Templates</h2>
          </div>
          <button
            onClick={() => setViewMode('templates')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Browse All Templates →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STARTER_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => createNewMap(`${tmpl.title} Map`, tmpl.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-800/80 p-5 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">
                  {tmpl.id === 'template-study-planner' ? '🎓' : tmpl.id === 'template-swot-analysis' ? '🎯' : '💡'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                  {tmpl.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tmpl.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {tmpl.description}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>{tmpl.nodes.length} Starter Nodes</span>
                <span className="group-hover:translate-x-1 transition-transform">Use Template →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Saved Maps List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Saved Mind Maps</h2>

          {/* Search & Category Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search maps..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-64"
              />
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-medium">
              {(['all', 'favorites', 'Education', 'Business', 'Creative'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Maps Cards Grid */}
        {filteredMaps.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-slate-800/60 p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
              <Network className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Mind Maps Found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {search ? 'No saved mind maps match your search query.' : 'Get started by creating your first interactive mind map graph!'}
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Mind Map</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaps.map((map) => (
              <div
                key={map.id}
                className="group relative rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Star & Options */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {map.category || 'General'}
                    </span>

                    <button
                      onClick={() => toggleFavorite(map.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        map.isFavorite ? 'text-amber-400 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-400 hover:text-amber-400'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => selectMap(map.id)}
                    className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1"
                  >
                    {map.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 min-h-[2rem]">
                    {map.description || 'Interactive visual mind map node graph.'}
                  </p>

                  {/* Canvas Preview Stats */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{map.nodes.length} Nodes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Network className="w-3.5 h-3.5 text-purple-500" />
                      <span>{map.connections.length} Lines</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(map.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => duplicateMap(map.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Duplicate Map"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMap(map.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Delete Map"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => selectMap(map.id)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 text-xs font-semibold transition-all"
                  >
                    <span>Open Editor</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create New Mind Map */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Create New Mind Map</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a title and a starter layout structure.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mind Map Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Marketing Campaign 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Starter Template
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {STARTER_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.title} ({tmpl.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Create Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
