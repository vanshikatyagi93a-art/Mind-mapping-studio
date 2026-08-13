import React, { useState } from 'react';
import { useMindMap } from '../../context/MindMapContext';
import { STARTER_TEMPLATES } from '../../utils/storage';
import { Sparkles, Network, ArrowRight, Layers, GraduationCap, ShieldAlert, Lightbulb } from 'lucide-react';

export const TemplatesGallery: React.FC = () => {
  const { applyTemplate } = useMindMap();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Education', 'Business', 'Creative'];

  const filteredTemplates = STARTER_TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Starter Template Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Jumpstart Your Visual Ideas & Workflow Maps
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Select any pre-built structured template to instantly clone into your workspace and start customizing nodes and connections.
        </p>

        {/* Category Pills */}
        <div className="pt-4 flex items-center justify-center space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shadow-inner">
                  {template.id === 'template-study-planner' ? (
                    <GraduationCap className="w-6 h-6" />
                  ) : template.id === 'template-swot-analysis' ? (
                    <ShieldAlert className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {template.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {template.description}
              </p>

              {/* Template Specs */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Included Nodes:</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{template.nodes.length} Items</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Network className="w-3.5 h-3.5 text-purple-500" />
                    <span>SVG Connections:</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{template.connections.length} Lines</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={() => applyTemplate(template)}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all group-hover:scale-[1.02]"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
