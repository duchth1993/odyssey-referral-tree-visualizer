import { create } from 'zustand';

// Generate mock referral data
const generateMockData = (rootId, depth = 4, maxChildren = 5) => {
  const names = [
    'CryptoKing', 'MoonWalker', 'DiamondHands', 'SatoshiFan', 'EthMaster',
    'DeFiWizard', 'NFTCollector', 'BlockchainBro', 'TokenTrader', 'YieldFarmer',
    'StakingPro', 'GasOptimizer', 'WhaleWatcher', 'ApeStrong', 'HODLer',
    'MetaVerse', 'Web3Native', 'DAOBuilder', 'SmartContract', 'LayerTwo'
  ];

  const generateWallet = () => {
    const chars = '0123456789abcdef';
    let wallet = '0x';
    for (let i = 0; i < 40; i++) {
      wallet += chars[Math.floor(Math.random() * chars.length)];
    }
    return wallet;
  };

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'ODY-';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  let nodeId = 0;
  const allNodes = [];

  const createNode = (parentId, level) => {
    const id = nodeId++;
    const isHot = Math.random() > 0.85;
    const childCount = level < depth ? Math.floor(Math.random() * maxChildren) : 0;
    
    const node = {
      id: `node-${id}`,
      name: names[Math.floor(Math.random() * names.length)] + id,
      wallet: generateWallet(),
      referralCode: generateReferralCode(),
      level,
      points: Math.floor(Math.random() * 10000) + 100,
      referralPoints: Math.floor(Math.random() * 5000),
      totalReferrals: childCount,
      directReferrals: childCount,
      isHot,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      tier: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.min(level, 4)],
      parentId,
      children: []
    };

    allNodes.push(node);

    if (level < depth) {
      for (let i = 0; i < childCount; i++) {
        const child = createNode(node.id, level + 1);
        node.children.push(child);
        node.totalReferrals += child.totalReferrals;
      }
    }

    return node;
  };

  const rootNode = createNode(null, 0);
  rootNode.name = rootId.startsWith('0x') ? 'You' : rootId;
  rootNode.wallet = rootId.startsWith('0x') ? rootId : generateWallet();
  rootNode.referralCode = rootId.startsWith('0x') ? generateReferralCode() : rootId;
  rootNode.isHot = true;
  rootNode.tier = 'Diamond';
  rootNode.points = 50000;

  return { tree: rootNode, allNodes };
};

const useStore = create((set, get) => ({
  // Tree data
  treeData: null,
  allNodes: [],
  isLoading: false,
  error: null,
  
  // UI state
  selectedNode: null,
  hoveredNode: null,
  searchQuery: '',
  filterLevel: null,
  showHotOnly: false,
  isCollapsed: {},
  
  // Zoom and pan
  transform: { x: 0, y: 0, k: 1 },
  
  // Stats
  stats: {
    totalNodes: 0,
    totalPoints: 0,
    hotChains: 0,
    maxDepth: 0,
    avgReferrals: 0
  },

  // Actions
  fetchTreeData: async (input) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { tree, allNodes } = generateMockData(input);
      
      // Calculate stats
      const totalPoints = allNodes.reduce((sum, n) => sum + n.points + n.referralPoints, 0);
      const hotChains = allNodes.filter(n => n.isHot).length;
      const maxDepth = Math.max(...allNodes.map(n => n.level));
      const avgReferrals = allNodes.reduce((sum, n) => sum + n.directReferrals, 0) / allNodes.length;
      
      set({
        treeData: tree,
        allNodes,
        isLoading: false,
        stats: {
          totalNodes: allNodes.length,
          totalPoints,
          hotChains,
          maxDepth,
          avgReferrals: avgReferrals.toFixed(1)
        }
      });
    } catch (error) {
      set({ error: 'Failed to fetch referral data. Please try again.', isLoading: false });
    }
  },

  setSelectedNode: (node) => set({ selectedNode: node }),
  setHoveredNode: (node) => set({ hoveredNode: node }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterLevel: (level) => set({ filterLevel: level }),
  setShowHotOnly: (show) => set({ showHotOnly: show }),
  setTransform: (transform) => set({ transform }),
  
  toggleCollapse: (nodeId) => set((state) => ({
    isCollapsed: {
      ...state.isCollapsed,
      [nodeId]: !state.isCollapsed[nodeId]
    }
  })),

  expandAll: () => set({ isCollapsed: {} }),
  
  collapseAll: () => {
    const { allNodes } = get();
    const collapsed = {};
    allNodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        collapsed[node.id] = true;
      }
    });
    set({ isCollapsed: collapsed });
  },

  resetView: () => set({
    selectedNode: null,
    searchQuery: '',
    filterLevel: null,
    showHotOnly: false,
    transform: { x: 0, y: 0, k: 1 },
    isCollapsed: {}
  }),

  clearData: () => set({
    treeData: null,
    allNodes: [],
    selectedNode: null,
    hoveredNode: null,
    stats: {
      totalNodes: 0,
      totalPoints: 0,
      hotChains: 0,
      maxDepth: 0,
      avgReferrals: 0
    }
  })
}));

export default useStore;
