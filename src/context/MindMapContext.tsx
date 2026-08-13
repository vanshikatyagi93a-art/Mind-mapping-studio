import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  MindMap,
  MindNode,
  Connection,
  ViewMode,
  ToolMode,
  GridStyle,
  Template,
  NodeColorTheme,
  NodeShape,
} from '../types';
import { loadSavedMapsFromStorage, saveMapsToStorage, STARTER_TEMPLATES } from '../utils/storage';
import { autoArrangeTreeLayout } from '../utils/autoLayout';
import confetti from 'canvas-confetti';

interface HistoryState {
  nodes: MindNode[];
  connections: Connection[];
}

interface MindMapContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  savedMaps: MindMap[];
  activeMap: MindMap | null;
  selectMap: (id: string) => void;
  createNewMap: (title?: string, templateId?: string) => void;
  duplicateMap: (id: string) => void;
  deleteMap: (id: string) => void;
  toggleFavorite: (id: string) => void;
  saveCurrentMap: () => void;
  importMap: (map: MindMap) => void;

  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
  gridStyle: GridStyle;
  setGridStyle: (style: GridStyle) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number | ((prev: number) => number)) => void;
  panOffset: { x: number; y: number };
  setPanOffset: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  resetView: () => void;

  selectedNodeIds: string[];
  setSelectedNodeIds: (ids: string[]) => void;
  selectedConnectionId: string | null;
  setSelectedConnectionId: (id: string | null) => void;
  inspectorOpen: boolean;
  setInspectorOpen: (open: boolean) => void;

  connectingFromNodeId: string | null;
  setConnectingFromNodeId: (id: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  addNode: (position?: { x: number; y: number }, parentId?: string) => void;
  updateNode: (id: string, updates: Partial<MindNode>) => void;
  deleteNode: (id: string) => void;
  deleteSelected: () => void;

  connectNodes: (fromId: string, toId: string) => void;
  updateConnection: (id: string, updates: Partial<Connection>) => void;
  deleteConnection: (id: string) => void;

  autoArrange: () => void;
  applyTemplate: (template: Template) => void;
}

const MindMapContext = createContext<MindMapContextType | undefined>(undefined);

export const MindMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [savedMaps, setSavedMaps] = useState<MindMap[]>(loadSavedMapsFromStorage);
  const [activeMap, setActiveMap] = useState<MindMap | null>(null);

  const [toolMode, setToolMode] = useState<ToolMode>('select');
  const [gridStyle, setGridStyle] = useState<GridStyle>('dots');
  const [snapToGrid, setSnapToGrid] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  const [connectingFromNodeId, setConnectingFromNodeId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    saveMapsToStorage(savedMaps);
  }, [savedMaps]);

  useEffect(() => {
    if (!activeMap && savedMaps.length > 0) {
      setActiveMap(savedMaps[0]);
    }
  }, [savedMaps, activeMap]);

  const pushHistory = useCallback(
    (nodes: MindNode[], connections: Connection[]) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        return [...newHistory, { nodes: JSON.parse(JSON.stringify(nodes)), connections: JSON.parse(JSON.stringify(connections)) }];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (!canUndo || !activeMap) return;
    const prevIndex = historyIndex - 1;
    const state = history[prevIndex];
    if (state) {
      setActiveMap((prev) => (prev ? { ...prev, nodes: state.nodes, connections: state.connections } : null));
      setHistoryIndex(prevIndex);
    }
  }, [canUndo, activeMap, historyIndex, history]);

  const redo = useCallback(() => {
    if (!canRedo || !activeMap) return;
    const nextIndex = historyIndex + 1;
    const state = history[nextIndex];
    if (state) {
      setActiveMap((prev) => (prev ? { ...prev, nodes: state.nodes, connections: state.connections } : null));
      setHistoryIndex(nextIndex);
    }
  }, [canRedo, activeMap, historyIndex, history]);

  const selectMap = (id: string) => {
    const found = savedMaps.find((m) => m.id === id);
    if (found) {
      setActiveMap(found);
      setHistory([{ nodes: found.nodes, connections: found.connections }]);
      setHistoryIndex(0);
      setSelectedNodeIds([]);
      setSelectedConnectionId(null);
      setViewMode('canvas');
    }
  };

  const createNewMap = (title?: string, templateId?: string) => {
    let template = STARTER_TEMPLATES[0];
    if (templateId) {
      const match = STARTER_TEMPLATES.find((t) => t.id === templateId);
      if (match) template = match;
    }

    const newMap: MindMap = {
      id: `map-${Date.now()}`,
      title: title || `${template.title} Map`,
      description: template.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: JSON.parse(JSON.stringify(template.nodes)),
      connections: JSON.parse(JSON.stringify(template.connections)),
      isFavorite: false,
      category: template.category,
    };

    setSavedMaps((prev) => [newMap, ...prev]);
    setActiveMap(newMap);
    setHistory([{ nodes: newMap.nodes, connections: newMap.connections }]);
    setHistoryIndex(0);
    setSelectedNodeIds([]);
    setSelectedConnectionId(null);
    setViewMode('canvas');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  const duplicateMap = (id: string) => {
    const target = savedMaps.find((m) => m.id === id);
    if (!target) return;
    const dup: MindMap = {
      ...target,
      id: `map-${Date.now()}`,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedMaps((prev) => [dup, ...prev]);
  };

  const deleteMap = (id: string) => {
    setSavedMaps((prev) => prev.filter((m) => m.id !== id));
    if (activeMap?.id === id) {
      const remaining = savedMaps.filter((m) => m.id !== id);
      setActiveMap(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const toggleFavorite = (id: string) => {
    setSavedMaps((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
    if (activeMap?.id === id) {
      setActiveMap((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const saveCurrentMap = () => {
    if (!activeMap) return;
    const updatedMap = { ...activeMap, updatedAt: new Date().toISOString() };
    setSavedMaps((prev) => prev.map((m) => (m.id === updatedMap.id ? updatedMap : m)));
    setActiveMap(updatedMap);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
  };

  const importMap = (map: MindMap) => {
    setSavedMaps((prev) => [map, ...prev]);
    setActiveMap(map);
    setHistory([{ nodes: map.nodes, connections: map.connections }]);
    setHistoryIndex(0);
    setViewMode('canvas');
    confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
  };

  const addNode = (position?: { x: number; y: number }, parentId?: string) => {
    if (!activeMap) return;

    const colors: NodeColorTheme[] = ['blue', 'emerald', 'purple', 'amber', 'rose', 'cyan'];
    const shapes: NodeShape[] = ['rectangle', 'rounded', 'circle', 'pill', 'cloud'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    let posX = position?.x;
    let posY = position?.y;

    if (!posX || !posY) {
      const parent = activeMap.nodes.find((n) => n.id === parentId) || activeMap.nodes[0];
      posX = parent ? parent.position.x + 180 : 500;
      posY = parent ? parent.position.y + 80 : 300;
    }

    const newNode: MindNode = {
      id: `node-${Date.now()}`,
      title: 'New Idea Node',
      position: { x: posX, y: posY },
      shape: randomShape,
      colorTheme: randomColor,
      notes: '',
      parentId: parentId || (selectedNodeIds.length === 1 ? selectedNodeIds[0] : undefined),
    };

    let newConnections = [...activeMap.connections];
    if (newNode.parentId) {
      newConnections.push({
        id: `conn-${Date.now()}`,
        fromNodeId: newNode.parentId,
        toNodeId: newNode.id,
        type: 'curved',
        pattern: 'solid',
        arrow: 'forward',
      });
    }

    const newNodes = [...activeMap.nodes, newNode];
    setActiveMap({ ...activeMap, nodes: newNodes, connections: newConnections });
    pushHistory(newNodes, newConnections);
    setSelectedNodeIds([newNode.id]);
  };

  const updateNode = (id: string, updates: Partial<MindNode>) => {
    if (!activeMap) return;
    const newNodes = activeMap.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n));
    setActiveMap({ ...activeMap, nodes: newNodes });
    pushHistory(newNodes, activeMap.connections);
  };

  const deleteNode = (id: string) => {
    if (!activeMap) return;
    const newNodes = activeMap.nodes.filter((n) => n.id !== id);
    const newConnections = activeMap.connections.filter((c) => c.fromNodeId !== id && c.toNodeId !== id);
    setActiveMap({ ...activeMap, nodes: newNodes, connections: newConnections });
    pushHistory(newNodes, newConnections);
    setSelectedNodeIds([]);
    setInspectorOpen(false);
  };

  const deleteSelected = () => {
    if (!activeMap) return;
    if (selectedNodeIds.length > 0) {
      const newNodes = activeMap.nodes.filter((n) => !selectedNodeIds.includes(n.id));
      const newConnections = activeMap.connections.filter(
        (c) => !selectedNodeIds.includes(c.fromNodeId) && !selectedNodeIds.includes(c.toNodeId)
      );
      setActiveMap({ ...activeMap, nodes: newNodes, connections: newConnections });
      pushHistory(newNodes, newConnections);
      setSelectedNodeIds([]);
    } else if (selectedConnectionId) {
      deleteConnection(selectedConnectionId);
    }
  };

  const connectNodes = (fromId: string, toId: string) => {
    if (!activeMap || fromId === toId) return;
    const exists = activeMap.connections.some(
      (c) => (c.fromNodeId === fromId && c.toNodeId === toId) || (c.fromNodeId === toId && c.toNodeId === fromId)
    );
    if (exists) return;

    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      fromNodeId: fromId,
      toNodeId: toId,
      type: 'curved',
      pattern: 'solid',
      arrow: 'forward',
    };

    const newConnections = [...activeMap.connections, newConnection];
    setActiveMap({ ...activeMap, connections: newConnections });
    pushHistory(activeMap.nodes, newConnections);
  };

  const updateConnection = (id: string, updates: Partial<Connection>) => {
    if (!activeMap) return;
    const newConnections = activeMap.connections.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setActiveMap({ ...activeMap, connections: newConnections });
    pushHistory(activeMap.nodes, newConnections);
  };

  const deleteConnection = (id: string) => {
    if (!activeMap) return;
    const newConnections = activeMap.connections.filter((c) => c.id !== id);
    setActiveMap({ ...activeMap, connections: newConnections });
    pushHistory(activeMap.nodes, newConnections);
    setSelectedConnectionId(null);
  };

  const autoArrange = () => {
    if (!activeMap) return;
    const arrangedNodes = autoArrangeTreeLayout(activeMap.nodes, activeMap.connections);
    setActiveMap({ ...activeMap, nodes: arrangedNodes });
    pushHistory(arrangedNodes, activeMap.connections);
  };

  const applyTemplate = (template: Template) => {
    createNewMap(`${template.title} Map`, template.id);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <MindMapContext.Provider
      value={{
        viewMode,
        setViewMode,
        theme,
        toggleTheme,
        savedMaps,
        activeMap,
        selectMap,
        createNewMap,
        duplicateMap,
        deleteMap,
        toggleFavorite,
        saveCurrentMap,
        importMap,
        toolMode,
        setToolMode,
        gridStyle,
        setGridStyle,
        snapToGrid,
        setSnapToGrid,
        zoomLevel,
        setZoomLevel,
        panOffset,
        setPanOffset,
        resetView,
        selectedNodeIds,
        setSelectedNodeIds,
        selectedConnectionId,
        setSelectedConnectionId,
        inspectorOpen,
        setInspectorOpen,
        connectingFromNodeId,
        setConnectingFromNodeId,
        searchQuery,
        setSearchQuery,
        canUndo,
        canRedo,
        undo,
        redo,
        addNode,
        updateNode,
        deleteNode,
        deleteSelected,
        connectNodes,
        updateConnection,
        deleteConnection,
        autoArrange,
        applyTemplate,
      }}
    >
      {children}
    </MindMapContext.Provider>
  );
};

export const useMindMap = () => {
  const context = useContext(MindMapContext);
  if (!context) {
    throw new Error('useMindMap must be used within a MindMapProvider');
  }
  return context;
};
