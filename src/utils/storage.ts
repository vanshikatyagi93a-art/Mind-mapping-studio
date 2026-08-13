import type { MindMap, Template } from '../types';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'mindmap_studio_saved_maps';

export const STARTER_TEMPLATES: Template[] = [
  {
    id: 'template-study-planner',
    title: 'Study Planner',
    description: 'Structure subjects, weekly goals, study modules, and revision schedules for exam success.',
    category: 'Education',
    icon: 'GraduationCap',
    nodes: [
      { id: 'n1', title: '🎓 Semester Exam Prep', shape: 'rounded', colorTheme: 'blue', position: { x: 500, y: 300 }, isRoot: true, notes: 'Target GPA: 9.0+. Daily study target: 4 hours.' },
      { id: 'n2', title: '💻 Data Structures', shape: 'rectangle', colorTheme: 'emerald', position: { x: 200, y: 150 }, parentId: 'n1' },
      { id: 'n3', title: '🗄️ Database Systems', shape: 'rectangle', colorTheme: 'amber', position: { x: 800, y: 150 }, parentId: 'n1' },
      { id: 'n4', title: '🌐 Web Development', shape: 'rectangle', colorTheme: 'purple', position: { x: 200, y: 450 }, parentId: 'n1' },
      { id: 'n5', title: '📡 Computer Networks', shape: 'rectangle', colorTheme: 'rose', position: { x: 800, y: 450 }, parentId: 'n1' },
      { id: 'n2-1', title: 'Trees & Graph Traversal', shape: 'pill', colorTheme: 'emerald', position: { x: 50, y: 100 }, parentId: 'n2' },
      { id: 'n2-2', title: 'Dynamic Programming', shape: 'pill', colorTheme: 'emerald', position: { x: 50, y: 200 }, parentId: 'n2' },
      { id: 'n3-1', title: 'SQL Joins & Indexing', shape: 'pill', colorTheme: 'amber', position: { x: 980, y: 100 }, parentId: 'n3' },
      { id: 'n3-2', title: 'ACID & Normalization', shape: 'pill', colorTheme: 'amber', position: { x: 980, y: 200 }, parentId: 'n3' },
      { id: 'n4-1', title: 'React Hooks & State', shape: 'pill', colorTheme: 'purple', position: { x: 50, y: 420 }, parentId: 'n4' },
      { id: 'n4-2', title: 'Canvas & SVG Lines', shape: 'pill', colorTheme: 'purple', position: { x: 50, y: 500 }, parentId: 'n4' },
      { id: 'n5-1', title: 'TCP/IP & OSI Model', shape: 'pill', colorTheme: 'rose', position: { x: 980, y: 420 }, parentId: 'n5' },
      { id: 'n5-2', title: 'DNS & HTTP/3 Protocol', shape: 'pill', colorTheme: 'rose', position: { x: 980, y: 500 }, parentId: 'n5' },
    ],
    connections: [
      { id: 'c1', fromNodeId: 'n1', toNodeId: 'n2', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#10b981' },
      { id: 'c2', fromNodeId: 'n1', toNodeId: 'n3', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#f59e0b' },
      { id: 'c3', fromNodeId: 'n1', toNodeId: 'n4', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#a855f7' },
      { id: 'c4', fromNodeId: 'n1', toNodeId: 'n5', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#f43f5e' },
      { id: 'c2-1', fromNodeId: 'n2', toNodeId: 'n2-1', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#10b981' },
      { id: 'c2-2', fromNodeId: 'n2', toNodeId: 'n2-2', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#10b981' },
      { id: 'c3-1', fromNodeId: 'n3', toNodeId: 'n3-1', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#f59e0b' },
      { id: 'c3-2', fromNodeId: 'n3', toNodeId: 'n3-2', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#f59e0b' },
      { id: 'c4-1', fromNodeId: 'n4', toNodeId: 'n4-1', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#a855f7' },
      { id: 'c4-2', fromNodeId: 'n4', toNodeId: 'n4-2', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#a855f7' },
      { id: 'c5-1', fromNodeId: 'n5', toNodeId: 'n5-1', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#f43f5e' },
      { id: 'c5-2', fromNodeId: 'n5', toNodeId: 'n5-2', type: 'straight', pattern: 'dashed', arrow: 'forward', color: '#f43f5e' },
    ],
  },
  {
    id: 'template-swot-analysis',
    title: 'SWOT Analysis',
    description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats for business strategy or products.',
    category: 'Business',
    icon: 'ShieldAlert',
    nodes: [
      { id: 'swot-root', title: '🎯 Product Launch Strategy', shape: 'diamond', colorTheme: 'indigo', position: { x: 500, y: 300 }, isRoot: true, notes: 'Q3 Product launch evaluation and strategic alignment.' },
      { id: 's-node', title: '💪 Strengths', shape: 'rounded', colorTheme: 'emerald', position: { x: 250, y: 120 } },
      { id: 'w-node', title: '⚠️ Weaknesses', shape: 'rounded', colorTheme: 'rose', position: { x: 750, y: 120 } },
      { id: 'o-node', title: '🚀 Opportunities', shape: 'rounded', colorTheme: 'cyan', position: { x: 250, y: 480 } },
      { id: 't-node', title: '🛡️ Threats', shape: 'rounded', colorTheme: 'amber', position: { x: 750, y: 480 } },
      { id: 's1', title: 'Fast Modern UI/UX', shape: 'pill', colorTheme: 'emerald', position: { x: 80, y: 80 } },
      { id: 's2', title: 'Zero Cloud Costs', shape: 'pill', colorTheme: 'emerald', position: { x: 80, y: 160 } },
      { id: 'w1', title: 'Limited Marketing Budget', shape: 'pill', colorTheme: 'rose', position: { x: 920, y: 80 } },
      { id: 'w2', title: 'No Mobile App Yet', shape: 'pill', colorTheme: 'rose', position: { x: 920, y: 160 } },
      { id: 'o1', title: 'Growing Remote Market', shape: 'pill', colorTheme: 'cyan', position: { x: 80, y: 440 } },
      { id: 'o2', title: 'AI Automation Integration', shape: 'pill', colorTheme: 'cyan', position: { x: 80, y: 520 } },
      { id: 't1', title: 'Established Competitors', shape: 'pill', colorTheme: 'amber', position: { x: 920, y: 440 } },
      { id: 't2', title: 'Rapid Tech Shift', shape: 'pill', colorTheme: 'amber', position: { x: 920, y: 520 } },
    ],
    connections: [
      { id: 'c-s', fromNodeId: 'swot-root', toNodeId: 's-node', type: 'step', pattern: 'solid', arrow: 'forward', color: '#10b981' },
      { id: 'c-w', fromNodeId: 'swot-root', toNodeId: 'w-node', type: 'step', pattern: 'solid', arrow: 'forward', color: '#f43f5e' },
      { id: 'c-o', fromNodeId: 'swot-root', toNodeId: 'o-node', type: 'step', pattern: 'solid', arrow: 'forward', color: '#06b6d4' },
      { id: 'c-t', fromNodeId: 'swot-root', toNodeId: 't-node', type: 'step', pattern: 'solid', arrow: 'forward', color: '#f59e0b' },
      { id: 'c-s1', fromNodeId: 's-node', toNodeId: 's1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#10b981' },
      { id: 'c-s2', fromNodeId: 's-node', toNodeId: 's2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#10b981' },
      { id: 'c-w1', fromNodeId: 'w-node', toNodeId: 'w1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#f43f5e' },
      { id: 'c-w2', fromNodeId: 'w-node', toNodeId: 'w2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#f43f5e' },
      { id: 'c-o1', fromNodeId: 'o-node', toNodeId: 'o1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#06b6d4' },
      { id: 'c-o2', fromNodeId: 'o-node', toNodeId: 'o2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#06b6d4' },
      { id: 'c-t1', fromNodeId: 't-node', toNodeId: 't1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#f59e0b' },
      { id: 'c-t2', fromNodeId: 't-node', toNodeId: 't2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#f59e0b' },
    ],
  },
  {
    id: 'template-brainstorm-map',
    title: 'Brainstorm Map',
    description: 'Freeform idea generator for innovation, team brainstorming, and creative planning.',
    category: 'Creative',
    icon: 'Lightbulb',
    nodes: [
      { id: 'b-root', title: '💡 Mind Mapping Studio App', shape: 'cloud', colorTheme: 'amber', position: { x: 500, y: 300 }, isRoot: true, notes: 'Brainstorming key features and architecture.' },
      { id: 'b-fe', title: '🎨 Interactive UI', shape: 'rounded', colorTheme: 'blue', position: { x: 220, y: 160 } },
      { id: 'b-be', title: '⚡ Canvas Engine', shape: 'rounded', colorTheme: 'emerald', position: { x: 780, y: 160 } },
      { id: 'b-db', title: '💾 Local Storage', shape: 'rounded', colorTheme: 'purple', position: { x: 220, y: 440 } },
      { id: 'b-ops', title: '🚀 Deployment', shape: 'rounded', colorTheme: 'cyan', position: { x: 780, y: 440 } },
      { id: 'b-fe-1', title: 'Draggable Nodes', shape: 'pill', colorTheme: 'blue', position: { x: 60, y: 120 } },
      { id: 'b-fe-2', title: 'Custom Shapes & Colors', shape: 'pill', colorTheme: 'blue', position: { x: 60, y: 200 } },
      { id: 'b-be-1', title: 'SVG Bezier Lines', shape: 'pill', colorTheme: 'emerald', position: { x: 940, y: 120 } },
      { id: 'b-be-2', title: 'Pan & Zoom Canvas', shape: 'pill', colorTheme: 'emerald', position: { x: 940, y: 200 } },
      { id: 'b-db-1', title: 'JSON Import & Export', shape: 'pill', colorTheme: 'purple', position: { x: 60, y: 400 } },
      { id: 'b-db-2', title: 'PNG Canvas Snapshots', shape: 'pill', colorTheme: 'purple', position: { x: 60, y: 480 } },
      { id: 'b-ops-1', title: 'Vercel / Netlify Deploy', shape: 'pill', colorTheme: 'cyan', position: { x: 940, y: 400 } },
      { id: 'b-ops-2', title: '.env Configuration', shape: 'pill', colorTheme: 'cyan', position: { x: 940, y: 480 } },
    ],
    connections: [
      { id: 'bc-1', fromNodeId: 'b-root', toNodeId: 'b-fe', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#3b82f6' },
      { id: 'bc-2', fromNodeId: 'b-root', toNodeId: 'b-be', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#10b981' },
      { id: 'bc-3', fromNodeId: 'b-root', toNodeId: 'b-db', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#a855f7' },
      { id: 'bc-4', fromNodeId: 'b-root', toNodeId: 'b-ops', type: 'curved', pattern: 'solid', arrow: 'forward', color: '#06b6d4' },
      { id: 'bc-fe1', fromNodeId: 'b-fe', toNodeId: 'b-fe-1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#3b82f6' },
      { id: 'bc-fe2', fromNodeId: 'b-fe', toNodeId: 'b-fe-2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#3b82f6' },
      { id: 'bc-be1', fromNodeId: 'b-be', toNodeId: 'b-be-1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#10b981' },
      { id: 'bc-be2', fromNodeId: 'b-be', toNodeId: 'b-be-2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#10b981' },
      { id: 'bc-db1', fromNodeId: 'b-db', toNodeId: 'b-db-1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#a855f7' },
      { id: 'bc-db2', fromNodeId: 'b-db', toNodeId: 'b-db-2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#a855f7' },
      { id: 'bc-ops1', fromNodeId: 'b-ops', toNodeId: 'b-ops-1', type: 'straight', pattern: 'solid', arrow: 'none', color: '#06b6d4' },
      { id: 'bc-ops2', fromNodeId: 'b-ops', toNodeId: 'b-ops-2', type: 'straight', pattern: 'solid', arrow: 'none', color: '#06b6d4' },
    ],
  },
];

export const loadSavedMapsFromStorage = (): MindMap[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultMaps: MindMap[] = STARTER_TEMPLATES.map((tmpl) => ({
        id: `map-${tmpl.id}-${Date.now()}`,
        title: `${tmpl.title} Map`,
        description: tmpl.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nodes: JSON.parse(JSON.stringify(tmpl.nodes)),
        connections: JSON.parse(JSON.stringify(tmpl.connections)),
        isFavorite: true,
        category: tmpl.category,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMaps));
      return defaultMaps;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading saved mind maps from LocalStorage:', error);
    return [];
  }
};

export const saveMapsToStorage = (maps: MindMap[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
  } catch (error) {
    console.error('Error saving mind maps to LocalStorage:', error);
  }
};
