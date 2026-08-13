import type { MindNode, Connection } from '../types';

export const autoArrangeTreeLayout = (nodes: MindNode[], connections: Connection[]): MindNode[] => {
  if (nodes.length === 0) return [];

  let rootNode = nodes.find((n) => n.isRoot) || nodes.find((n) => !n.parentId);
  if (!rootNode) rootNode = nodes[0];

  const nodeMap = new Map<string, MindNode>();
  nodes.forEach((node) => nodeMap.set(node.id, { ...node }));

  const childrenMap = new Map<string, string[]>();
  connections.forEach((conn) => {
    const list = childrenMap.get(conn.fromNodeId) || [];
    list.push(conn.toNodeId);
    childrenMap.set(conn.fromNodeId, list);
  });

  const rootX = 600;
  const rootY = 400;

  const updatedNodes = nodes.map((node) => {
    if (node.id === rootNode.id) {
      return { ...node, position: { x: rootX, y: rootY } };
    }
    return { ...node };
  });

  const mainBranchIds = childrenMap.get(rootNode.id) || [];
  const totalMain = mainBranchIds.length;

  if (totalMain > 0) {
    mainBranchIds.forEach((childId, index) => {
      const angle = (index / totalMain) * 2 * Math.PI - Math.PI / 2;
      const radius = 280;
      const childX = Math.round(rootX + radius * Math.cos(angle));
      const childY = Math.round(rootY + radius * Math.sin(angle));

      const targetIdx = updatedNodes.findIndex((n) => n.id === childId);
      if (targetIdx !== -1) {
        updatedNodes[targetIdx].position = { x: childX, y: childY };
      }

      const subChildren = childrenMap.get(childId) || [];
      subChildren.forEach((subId, subIdx) => {
        const subAngle = angle + (subIdx - (subChildren.length - 1) / 2) * 0.35;
        const subRadius = 180;
        const subX = Math.round(childX + subRadius * Math.cos(subAngle));
        const subY = Math.round(childY + subRadius * Math.sin(subAngle));

        const subTargetIdx = updatedNodes.findIndex((n) => n.id === subId);
        if (subTargetIdx !== -1) {
          updatedNodes[subTargetIdx].position = { x: subX, y: subY };
        }
      });
    });
  }

  return updatedNodes;
};
