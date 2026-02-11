import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { toPng, toSvg } from 'html-to-image';
import useStore from '../store/useStore';
import TreeControls from './TreeControls';
import NodeTooltip from './NodeTooltip';

const TreeVisualization = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const zoomRef = useRef(null);
  const [tooltipData, setTooltipData] = React.useState({ node: null, position: { x: 0, y: 0 } });

  const {
    treeData,
    searchQuery,
    filterLevel,
    showHotOnly,
    isCollapsed,
    setSelectedNode,
    setHoveredNode,
    toggleCollapse,
    transform,
    setTransform
  } = useStore();

  const tierColors = {
    Bronze: '#b45309',
    Silver: '#6b7280',
    Gold: '#eab308',
    Platinum: '#06b6d4',
    Diamond: '#a855f7'
  };

  const getNodeColor = (node) => {
    if (node.isHot) return '#f59e0b';
    return tierColors[node.tier] || '#8b5cf6';
  };

  const filterTree = useCallback((node) => {
    if (!node) return null;

    const matchesSearch = !searchQuery || 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.referralCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === null || node.level === filterLevel;
    const matchesHot = !showHotOnly || node.isHot;

    if (!matchesSearch && !matchesLevel && !matchesHot) {
      return null;
    }

    const filteredChildren = node.children
      ? node.children.map(filterTree).filter(Boolean)
      : [];

    return {
      ...node,
      children: isCollapsed[node.id] ? [] : filteredChildren
    };
  }, [searchQuery, filterLevel, showHotOnly, isCollapsed]);

  const handleZoomIn = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomRef.current.scaleBy, 0.7);
    }
  };

  const handleReset = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(500)
        .call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  const handleExport = async (format) => {
    if (!containerRef.current) return;

    try {
      const dataUrl = format === 'png' 
        ? await toPng(containerRef.current, { backgroundColor: '#0f172a' })
        : await toSvg(containerRef.current, { backgroundColor: '#0f172a' });

      const link = document.createElement('a');
      link.download = `odyssey-referral-tree.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  useEffect(() => {
    if (!treeData || !svgRef.current) return;

    const filteredData = filterTree(treeData);
    if (!filteredData) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.selectAll('*').remove();

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setTransform(event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, 80)`);

    // Create tree layout
    const treeLayout = d3.tree()
      .nodeSize([120, 150])
      .separation((a, b) => a.parent === b.parent ? 1.2 : 1.5);

    const root = d3.hierarchy(filteredData);
    treeLayout(root);

    // Create gradient definitions
    const defs = svg.append('defs');

    // Link gradient
    const linkGradient = defs.append('linearGradient')
      .attr('id', 'linkGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    linkGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0.6);

    linkGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.6);

    // Hot link gradient
    const hotLinkGradient = defs.append('linearGradient')
      .attr('id', 'hotLinkGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    hotLinkGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 0.8);

    hotLinkGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#ef4444')
      .attr('stop-opacity', 0.8);

    // Glow filter
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');

    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Draw links
    const links = g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'tree-link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y))
      .attr('stroke', d => d.target.data.isHot ? 'url(#hotLinkGradient)' : 'url(#linkGradient)')
      .attr('stroke-width', d => d.target.data.isHot ? 3 : 2)
      .attr('filter', d => d.target.data.isHot ? 'url(#glow)' : null)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 20)
      .attr('opacity', 1);

    // Draw animated particles on hot links
    root.links().forEach((link, i) => {
      if (link.target.data.isHot) {
        const path = g.append('path')
          .attr('d', d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y)(link))
          .attr('fill', 'none')
          .attr('stroke', 'none');

        const pathLength = path.node().getTotalLength();

        g.append('circle')
          .attr('r', 3)
          .attr('fill', '#f59e0b')
          .attr('filter', 'url(#glow)')
          .append('animateMotion')
          .attr('dur', '2s')
          .attr('repeatCount', 'indefinite')
          .append('mpath')
          .attr('href', () => {
            const pathId = `path-${i}`;
            path.attr('id', pathId);
            return `#${pathId}`;
          });
      }
    });

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d.data);
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        toggleCollapse(d.data.id);
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d.data);
        setTooltipData({
          node: d.data,
          position: { x: event.pageX, y: event.pageY }
        });
      })
      .on('mousemove', (event) => {
        setTooltipData(prev => ({
          ...prev,
          position: { x: event.pageX, y: event.pageY }
        }));
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        setTooltipData({ node: null, position: { x: 0, y: 0 } });
      });

    // Node outer glow
    nodes.append('circle')
      .attr('r', 35)
      .attr('fill', d => getNodeColor(d.data))
      .attr('opacity', 0.2)
      .attr('filter', 'url(#glow)');

    // Node main circle
    nodes.append('circle')
      .attr('r', 28)
      .attr('fill', '#0f172a')
      .attr('stroke', d => getNodeColor(d.data))
      .attr('stroke-width', 3)
      .attr('class', 'node-circle')
      .attr('filter', d => d.data.isHot ? 'url(#glow)' : null);

    // Node inner gradient
    nodes.append('circle')
      .attr('r', 22)
      .attr('fill', d => {
        const color = getNodeColor(d.data);
        return `url(#nodeGradient-${d.data.id})`;
      })
      .each(function(d) {
        const color = getNodeColor(d.data);
        const gradient = defs.append('radialGradient')
          .attr('id', `nodeGradient-${d.data.id}`)
          .attr('cx', '30%')
          .attr('cy', '30%');

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0.3);

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0.1);
      });

    // Node level indicator
    nodes.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => d.data.level);

    // Node name label
    nodes.append('text')
      .attr('dy', 50)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .text(d => d.data.name.length > 12 ? d.data.name.slice(0, 12) + '...' : d.data.name);

    // Points badge
    nodes.append('rect')
      .attr('x', 15)
      .attr('y', -35)
      .attr('width', 45)
      .attr('height', 18)
      .attr('rx', 9)
      .attr('fill', d => d.data.isHot ? '#f59e0b' : '#8b5cf6')
      .attr('opacity', 0.9);

    nodes.append('text')
      .attr('x', 37)
      .attr('y', -22)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .text(d => {
        const pts = d.data.points;
        if (pts >= 1000) return `${(pts / 1000).toFixed(1)}k`;
        return pts;
      });

    // Collapse indicator
    nodes.filter(d => d.data.children && d.data.children.length > 0)
      .append('circle')
      .attr('cy', 35)
      .attr('r', 8)
      .attr('fill', '#1e293b')
      .attr('stroke', '#475569')
      .attr('stroke-width', 1);

    nodes.filter(d => d.data.children && d.data.children.length > 0)
      .append('text')
      .attr('y', 39)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(d => isCollapsed[d.data.id] ? '+' : d.data.children.length);

    // Hot indicator
    nodes.filter(d => d.data.isHot)
      .append('text')
      .attr('x', -25)
      .attr('y', -25)
      .attr('font-size', '16px')
      .text('🔥');

    // Animate nodes entrance
    nodes.attr('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 30)
      .attr('opacity', 1);

    // Initial zoom to fit
    const bounds = g.node().getBBox();
    const fullWidth = bounds.width;
    const fullHeight = bounds.height;
    const midX = bounds.x + fullWidth / 2;
    const midY = bounds.y + fullHeight / 2;

    const scale = 0.8 / Math.max(fullWidth / width, fullHeight / height);
    const translateX = width / 2 - scale * midX;
    const translateY = height / 2 - scale * midY;

    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));

  }, [treeData, searchQuery, filterLevel, showHotOnly, isCollapsed, filterTree, setSelectedNode, setHoveredNode, toggleCollapse, setTransform]);

  return (
    <div className="flex-1 flex flex-col">
      <TreeControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onExport={handleExport}
      />
      
      <div 
        ref={containerRef}
        className="flex-1 relative rounded-2xl overflow-hidden glass"
        style={{ minHeight: '500px' }}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />
        
        <NodeTooltip 
          node={tooltipData.node} 
          position={tooltipData.position} 
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass rounded-xl p-3">
          <p className="text-xs text-odyssey-dark-400 mb-2">Tier Legend</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tierColors).map(([tier, color]) => (
              <div key={tier} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-odyssey-dark-300">{tier}</span>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <span className="text-xs">🔥</span>
              <span className="text-xs text-odyssey-dark-300">Hot</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 glass rounded-xl p-3">
          <p className="text-xs text-odyssey-dark-400">
            <span className="text-odyssey-purple-400">Click</span> to select • 
            <span className="text-odyssey-blue-400"> Double-click</span> to expand/collapse • 
            <span className="text-odyssey-dark-300"> Scroll</span> to zoom
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualization;
