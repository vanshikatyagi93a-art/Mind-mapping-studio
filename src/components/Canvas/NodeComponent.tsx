import React, { useState } from 'react';
import type { MindNode, NodeShape, NodeColorTheme } from '../../types';
import { useMindMap } from '../../context/MindMapContext';
import {
  Plus,
  Trash2,
  Sliders,
  FileText,
  Sparkles,
  GraduationCap,
  ShieldAlert,
  Lightbulb,
  CheckCircle,
  Folder,
  Code,
  Globe,
  Database,
  Cpu,
} from 'lucide-react';

interface NodeComponentProps {
  node: MindNode;
  onDragStart: (e: React.MouseEvent, nodeId: string) => void;
}

const colorThemeClasses: Record<NodeColorTheme, { bg: string; border: string; text: string; ring: string }> = {
  slate: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-300 dark:border-slate-700',
    text: 'text-slate-900 dark:text-slate-100',
    ring: 'ring-slate-400',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/80',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-900 dark:text-blue-100',
    ring: 'ring-blue-500',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/80',
    border: 'border-indigo-300 dark:border-indigo-700',
    text: 'text-indigo-900 dark:text-indigo-100',
    ring: 'ring-indigo-500',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/80',
    border: 'border-emerald-300 dark:border-emerald-700',
    text: 'text-emerald-900 dark:text-emerald-100',
    ring: 'ring-emerald-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/80',
    border: 'border-amber-300 dark:border-amber-700',
    text: 'text-amber-900 dark:text-amber-100',
    ring: 'ring-amber-500',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/80',
    border: 'border-rose-300 dark:border-rose-700',
    text: 'text-rose-900 dark:text-rose-100',
    ring: 'ring-rose-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/80',
    border: 'border-purple-300 dark:border-purple-700',
    text: 'text-purple-900 dark:text-purple-100',
    ring: 'ring-purple-500',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950/80',
    border: 'border-teal-300 dark:border-teal-700',
    text: 'text-teal-900 dark:text-teal-100',
    ring: 'ring-teal-500',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/80',
    border: 'border-cyan-300 dark:border-cyan-700',
    text: 'text-cyan-900 dark:text-cyan-100',
    ring: 'ring-cyan-500',
  },
};

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'GraduationCap': return GraduationCap;
    case 'ShieldAlert': return ShieldAlert;
    case 'Lightbulb': return Lightbulb;
    case 'CheckCircle': return CheckCircle;
    case 'Folder': return Folder;
    case 'Code': return Code;
    case 'Globe': return Globe;
    case 'Database': return Database;
    case 'Cpu': return Cpu;
    default: return Sparkles;
  }
};

export const NodeComponent: React.FC<NodeComponentProps> = ({ node, onDragStart }) => {
  const {
    selectedNodeIds,
    setSelectedNodeIds,
    updateNode,
    deleteNode,
    addNode,
    setInspectorOpen,
    setConnectingFromNodeId,
    searchQuery,
    toolMode,
  } = useMindMap();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);

  const isSelected = selectedNodeIds.includes(node.id);
  const isSearchHit = searchQuery.trim() !== '' && (node.title.toLowerCase().includes(searchQuery.toLowerCase()) || (node.notes && node.notes.toLowerCase().includes(searchQuery.toLowerCase())));

  const colorStyle = colorThemeClasses[node.colorTheme] || colorThemeClasses.blue;

  const getShapeClass = (shape: NodeShape) => {
    switch (shape) {
      case 'rounded':
        return 'rounded-3xl';
      case 'circle':
        return 'rounded-full px-6 py-6 aspect-square justify-center text-center';
      case 'diamond':
        return 'rounded-2xl transform rotate-45 p-6';
      case 'pill':
        return 'rounded-full px-5 py-2';
      case 'cloud':
        return 'rounded-3xl border-dashed border-2';
      case 'rectangle':
      default:
        return 'rounded-xl';
    }
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
    if (editedTitle.trim() && editedTitle !== node.title) {
      updateNode(node.id, { title: editedTitle.trim() });
    } else {
      setEditedTitle(node.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(node.title);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (toolMode === 'connect') {
      setConnectingFromNodeId(node.id);
      return;
    }

    if (e.shiftKey) {
      if (isSelected) {
        setSelectedNodeIds(selectedNodeIds.filter((id) => id !== node.id));
      } else {
        setSelectedNodeIds([...selectedNodeIds, node.id]);
      }
    } else {
      setSelectedNodeIds([node.id]);
    }
  };

  const IconComp = getIconComponent(node.icon);

  return (
    <div
      id={`node-${node.id}`}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
      onClick={handleClick}
      onMouseDown={(e) => onDragStart(e, node.id)}
      className={`absolute cursor-move select-none group transition-shadow duration-150 ${
        isSelected ? `ring-2 ring-offset-2 dark:ring-offset-slate-900 ${colorStyle.ring} shadow-xl scale-[1.02]` : 'hover:shadow-md'
      } ${isSearchHit ? 'ring-4 ring-amber-400 animate-pulse' : ''}`}
    >
      <div
        className={`relative min-w-[160px] max-w-[280px] p-3.5 border-2 shadow-sm backdrop-blur-md transition-all ${colorStyle.bg} ${colorStyle.border} ${colorStyle.text} ${getShapeClass(
          node.shape
        )}`}
      >
        <div className={node.shape === 'diamond' ? 'transform -rotate-45' : ''}>
          
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center space-x-1.5">
              {node.icon && <IconComp className="w-4 h-4 opacity-80" />}
              {node.isRoot && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-indigo-500 text-white shadow-sm">
                  Root
                </span>
              )}
            </div>

            {node.notes && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeIds([node.id]);
                  setInspectorOpen(true);
                }}
                className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:scale-110 transition-transform cursor-pointer"
                title="Node Notes attached"
              >
                <FileText className="w-3 h-3" />
              </span>
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleKeyDown}
              className="w-full text-sm font-semibold bg-white dark:bg-slate-900 px-2 py-1 rounded border border-indigo-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-sm font-bold tracking-tight leading-snug break-words"
            >
              {node.title}
            </div>
          )}

          {node.notes && !isEditing && (
            <p className="text-[11px] opacity-75 mt-1 line-clamp-1 italic">
              {node.notes}
            </p>
          )}

        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 left-1/2 -translate-x-1/2 flex items-center space-x-1 px-2 py-1 rounded-xl bg-slate-900/90 text-white shadow-lg backdrop-blur-sm z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addNode(undefined, node.id);
            }}
            className="p-1 hover:text-indigo-400 rounded transition-colors"
            title="Add Child Node"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNodeIds([node.id]);
              setInspectorOpen(true);
            }}
            className="p-1 hover:text-indigo-400 rounded transition-colors"
            title="Customize Node Style & Notes"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="p-1 hover:text-rose-400 rounded transition-colors"
            title="Delete Node"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setConnectingFromNodeId(node.id);
          }}
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-crosshair hover:scale-125"
          title="Drag connection line from node"
        />

      </div>
    </div>
  );
};
