import React from 'react';
import { MindMapProvider, useMindMap } from './context/MindMapContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MindMapCanvas } from './components/Canvas/MindMapCanvas';
import { TemplatesGallery } from './components/Templates/TemplatesGallery';
import { DocumentationView } from './components/Documentation/DocumentationView';

const MainContent: React.FC = () => {
  const { viewMode } = useMindMap();

  return (
    <main className="flex-1">
      {viewMode === 'dashboard' && <Dashboard />}
      {viewMode === 'canvas' && <MindMapCanvas />}
      {viewMode === 'templates' && <TemplatesGallery />}
      {viewMode === 'documentation' && <DocumentationView />}
    </main>
  );
};

export function App() {
  return (
    <MindMapProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar />
        <MainContent />
      </div>
    </MindMapProvider>
  );
}

export default App;
