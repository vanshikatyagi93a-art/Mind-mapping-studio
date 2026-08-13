export type NodeShape = 'rectangle' | 'rounded' | 'circle' | 'diamond' | 'pill' | 'cloud';

export type NodeColorTheme = 'slate' | 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'teal' | 'cyan';

export type ConnectionType = 'straight' | 'curved' | 'step';

export type LinePattern = 'solid' | 'dashed' | 'dotted';

export type ArrowDirection = 'none' | 'forward' | 'backward' | 'bidirectional';

export interface Position {
  x: number;
  y: number;
}

export interface MindNode {
  id: string;
  title: string;
  notes?: string;
  position: Position;
  shape: NodeShape;
  colorTheme: NodeColorTheme;
  icon?: string;
  customBg?: string;
  customBorder?: string;
  width?: number;
  height?: number;
  isRoot?: boolean;
  parentId?: string;
}

export interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label?: string;
  type: ConnectionType;
  pattern: LinePattern;
  arrow: ArrowDirection;
  color?: string;
}

export interface MindMap {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: MindNode[];
  connections: Connection[];
  isFavorite?: boolean;
  category?: string;
}

export type ViewMode = 'dashboard' | 'canvas' | 'templates' | 'documentation';

export type ToolMode = 'select' | 'connect' | 'node' | 'pan';

export type GridStyle = 'dots' | 'lines' | 'none';

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  nodes: MindNode[];
  connections: Connection[];
}

export interface UserSettings {
  theme: 'light' | 'dark';
  gridStyle: GridStyle;
  snapToGrid: boolean;
  showCollaborators: boolean;
}
