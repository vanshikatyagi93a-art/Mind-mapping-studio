import { toPng } from 'html-to-image';
import type { MindMap } from '../types';

export const exportMapAsJSON = (map: MindMap): void => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(map, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${map.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_mindmap.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportCanvasAsPNG = async (canvasElementId: string, filename: string): Promise<boolean> => {
  const element = document.getElementById(canvasElementId);
  if (!element) {
    console.error(`Canvas element with id ${canvasElementId} not found`);
    return false;
  }

  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      quality: 0.95,
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.download = `${filename.toLowerCase().replace(/[^a-z0-9]/g, '_')}_snapshot.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Failed to export canvas as PNG:', err);
    return false;
  }
};

export const parseImportedJSON = (jsonString: string): MindMap | null => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.connections)) return null;

    return {
      id: `imported-${Date.now()}`,
      title: parsed.title ? `${parsed.title} (Imported)` : 'Imported Mind Map',
      description: parsed.description || 'Imported mind map file',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: parsed.nodes,
      connections: parsed.connections,
      isFavorite: false,
    };
  } catch (err) {
    console.error('Invalid JSON file format:', err);
    return null;
  }
};
