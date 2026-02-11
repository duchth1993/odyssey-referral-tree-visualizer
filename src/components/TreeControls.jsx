import React from 'react';
import { 
  ZoomIn, ZoomOut, Maximize2, Search, Filter, Flame, 
  ChevronDown, ChevronUp, Download, RotateCcw, Layers
} from 'lucide-react';
import useStore from '../store/useStore';

const TreeControls = ({ onZoomIn, onZoomOut, onReset, onExport }) => {
  const { 
    searchQuery, setSearchQuery, 
    filterLevel, setFilterLevel,
    showHotOnly, setShowHotOnly,
    expandAll, collapseAll,
    stats
  } = useStore();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-odyssey-dark-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search nodes..."
          className="input-field pl-10 py-2 text-sm"
        />
      </div>

      {/* Level Filter */}
      <div className="relative">
        <select
          value={filterLevel || ''}
          onChange={(e) => setFilterLevel(e.target.value ? parseInt(e.target.value) : null)}
          className="input-field py-2 pr-10 text-sm appearance-none cursor-pointer"
        >
          <option value="">All Levels</option>
          {Array.from({ length: stats.maxDepth + 1 }, (_, i) => (
            <option key={i} value={i}>Level {i}</option>
          ))}
        </select>
        <Layers className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-odyssey-dark-500 pointer-events-none" />
      </div>

      {/* Hot Only Toggle */}
      <button
        onClick={() => setShowHotOnly(!showHotOnly)}
        className={`btn-secondary flex items-center gap-2 ${showHotOnly ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : ''}`}
      >
        <Flame className="w-4 h-4" />
        <span className="text-sm">Hot Only</span>
      </button>

      <div className="h-6 w-px bg-odyssey-dark-700" />

      {/* Expand/Collapse */}
      <button onClick={expandAll} className="btn-secondary p-2" title="Expand All">
        <ChevronDown className="w-4 h-4" />
      </button>
      <button onClick={collapseAll} className="btn-secondary p-2" title="Collapse All">
        <ChevronUp className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-odyssey-dark-700" />

      {/* Zoom Controls */}
      <button onClick={onZoomIn} className="btn-secondary p-2" title="Zoom In">
        <ZoomIn className="w-4 h-4" />
      </button>
      <button onClick={onZoomOut} className="btn-secondary p-2" title="Zoom Out">
        <ZoomOut className="w-4 h-4" />
      </button>
      <button onClick={onReset} className="btn-secondary p-2" title="Reset View">
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-odyssey-dark-700" />

      {/* Export */}
      <div className="relative group">
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span className="text-sm">Export</span>
        </button>
        <div className="absolute top-full right-0 mt-2 py-2 w-32 glass rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <button
            onClick={() => onExport('png')}
            className="w-full px-4 py-2 text-left text-sm hover:bg-odyssey-purple-500/20 transition-colors"
          >
            Export PNG
          </button>
          <button
            onClick={() => onExport('svg')}
            className="w-full px-4 py-2 text-left text-sm hover:bg-odyssey-purple-500/20 transition-colors"
          >
            Export SVG
          </button>
        </div>
      </div>

      {/* Reset All */}
      <button
        onClick={() => {
          setSearchQuery('');
          setFilterLevel(null);
          setShowHotOnly(false);
          onReset();
        }}
        className="btn-secondary p-2"
        title="Reset All Filters"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TreeControls;
