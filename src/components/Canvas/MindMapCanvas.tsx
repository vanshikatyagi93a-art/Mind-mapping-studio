import React, { useRef, useState, useEffect } from 'react';
import { useMindMap } from '../../context/MindMapContext';
import { NodeComponent } from './NodeComponent';
import { Toolbar } from './Toolbar';
import { NodeInspector } from './NodeInspector';
import { ConnectionInspector } from './ConnectionInspector';
import type { Connection } from '../../types';

export const MindMapCanvas: React.FC = () => {
  const {
    activeMap,
    zoomLevel,
    setZoomLevel,
    panOffset,
    setPanOffset,
    gridStyle,
    toolMode,
    updateNode,
    setSelectedNodeIds,
    selectedConnectionId,
    setSelectedConnectionId,
    connectingFromNodeId,
    setConnectingFromNodeId,
    connectNodes,
  } = useMindMap();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleBackgroundClick = () => {
    setSelectedNodeIds([]);
    setSelectedConnectionId(null);
    setConnectingFromNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoomLevel((prev) => Math.min(Math.max(0.3, prev * zoomFactor), 2.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg') {
      handleBackgroundClick();
      if (toolMode === 'pan' || e.button === 1 || e.button === 0) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      }
    }
  };

  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    if (toolMode === 'pan') return;
    e.stopPropagation();
    const node = activeMap?.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    if (connectingFromNodeId && connectingFromNodeId !== nodeId) {
      connectNodes(connectingFromNodeId, nodeId);
      setConnectingFromNodeId(null);
      return;
    }

    setDraggingNodeId(nodeId);
    setDragOffset({
      x: e.clientX / zoomLevel - node.position.x,
      y: e.clientY / zoomLevel - node.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left - panOffset.x) / zoomLevel,
        y: (e.clientY - rect.top - panOffset.y) / zoomLevel,
      });
    }

    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    } else if (draggingNodeId) {
      const newX = Math.round(e.clientX / zoomLevel - dragOffset.x);
      const newY = Math.round(e.clientY / zoomLevel - dragOffset.y);
      updateNode(draggingNodeId, { position: { x: newX, y: newY } });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!activeMap) return null;

  const calculatePath = (conn: Connection) => {
    const fromNode = activeMap.nodes.find((n) => n.id === conn.fromNodeId);
    const toNode = activeMap.nodes.find((n) => n.id === conn.toNodeId);
    if (!fromNode || !toNode) return { path: '', midX: 0, midY: 0 };

    const x1 = fromNode.position.x + 100;
    const y1 = fromNode.position.y + 35;
    const x2 = toNode.position.x + 100;
    const y2 = toNode.position.y + 35;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    let path = '';
    if (conn.type === 'straight') {
      path = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else if (conn.type === 'step') {
      path = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
    } else {
      const dx = Math.abs(x2 - x1) / 2;
      path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    }

    return { path, midX, midY };
  };

  const getGridBgClass = () => {
    if (gridStyle === 'dots') return 'bg-grid-dots';
    if (gridStyle === 'lines') return 'bg-grid-lines';
    return '';
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-slate-100 dark:bg-slate-950 select-none">
      
      <div
        id="mindmap-canvas-viewport"
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing ${getGridBgClass()}`}
        style={{
          backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
        }}
      >
        <div
          className="absolute inset-0 origin-top-left transition-transform duration-75 ease-out pointer-events-none"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          }}
        >
          
          <svg className="absolute overflow-visible w-[5000px] h-[5000px] pointer-events-auto">
            <defs>
              <marker id="arrow-forward" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
              </marker>
              <marker id="arrow-backward" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 10 0 L 0 5 L 10 10 z" fill="#6366f1" />
              </marker>
            </defs>

            {activeMap.connections.map((conn) => {
              const { path, midX, midY } = calculatePath(conn);
              if (!path) return null;
              const isSelected = selectedConnectionId === conn.id;

              return (
                <g key={conn.id} className="group cursor-pointer">
                  <path
                    d={path}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConnectionId(conn.id);
                      setSelectedNodeIds([]);
                    }}
                  />

                  <path
                    d={path}
                    fill="none"
                    stroke={isSelected ? '#818cf8' : conn.color || '#64748b'}
                    strokeWidth={isSelected ? 3.5 : 2}
                    strokeDasharray={conn.pattern === 'dashed' ? '6 6' : conn.pattern === 'dotted' ? '2 4' : undefined}
                    markerEnd={conn.arrow === 'forward' || conn.arrow === 'bidirectional' ? 'url(#arrow-forward)' : undefined}
                    markerStart={conn.arrow === 'backward' || conn.arrow === 'bidirectional' ? 'url(#arrow-backward)' : undefined}
                    className={`transition-colors ${isSelected ? 'stroke-indigo-500' : 'group-hover:stroke-indigo-400'}`}
                  />

                  {conn.label && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect x="-35" y="-12" width="70" height="20" rx="6" fill="#1e293b" opacity="0.85" />
                      <text textAnchor="middle" y="2" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {conn.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {connectingFromNodeId && (
              <line
                x1={(activeMap.nodes.find((n) => n.id === connectingFromNodeId)?.position.x || 0) + 100}
                y1={(activeMap.nodes.find((n) => n.id === connectingFromNodeId)?.position.y || 0) + 35}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke="#6366f1"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                className="animate-flow-dash"
              />
            )}
          </svg>

          <div className="absolute inset-0 pointer-events-auto">
            {activeMap.nodes.map((node) => (
              <NodeComponent key={node.id} node={node} onDragStart={handleNodeDragStart} />
            ))}
          </div>

        </div>

      </div>

      <Toolbar />
      <NodeInspector />
      <ConnectionInspector />

    </div>
  );
};
