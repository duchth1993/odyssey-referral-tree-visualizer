import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import StatsPanel from './components/StatsPanel';
import TreeVisualization from './components/TreeVisualization';
import NodeDetailPanel from './components/NodeDetailPanel';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import useStore from './store/useStore';

function App() {
  const { treeData, isLoading, error, selectedNode } = useStore();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 px-6 py-8">
          <div className={`max-w-7xl mx-auto flex flex-col h-full ${selectedNode ? 'mr-96' : ''} transition-all duration-300`}>
            {/* Hero Section */}
            {!treeData && !isLoading && !error && (
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="gradient-text">Referral Tree</span>
                  <br />
                  <span className="text-white">Visualizer</span>
                </h1>
                <p className="text-odyssey-dark-400 text-lg max-w-2xl mx-auto">
                  Explore your complete referral network with interactive visualizations. 
                  Track points, identify top performers, and understand your network's growth.
                </p>
              </div>
            )}

            {/* Search Input */}
            <div className="mb-8">
              <SearchInput />
            </div>

            {/* Content Area */}
            {error ? (
              <ErrorState message={error} />
            ) : isLoading ? (
              <LoadingState />
            ) : treeData ? (
              <>
                <StatsPanel />
                <TreeVisualization />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-4 border-t border-odyssey-dark-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-odyssey-dark-500">
            <p>© 2025 Odyssey Protocol. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-odyssey-purple-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-odyssey-purple-400 transition-colors">Support</a>
              <a href="#" className="hover:text-odyssey-purple-400 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Detail Panel */}
      <NodeDetailPanel />
    </div>
  );
}

export default App;
