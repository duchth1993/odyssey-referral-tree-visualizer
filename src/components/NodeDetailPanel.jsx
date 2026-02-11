import React from 'react';
import { 
  X, User, Wallet, Hash, Calendar, Clock, Award, 
  Users, Coins, TrendingUp, Flame, Copy, ExternalLink,
  ChevronRight
} from 'lucide-react';
import useStore from '../store/useStore';

const NodeDetailPanel = () => {
  const { selectedNode, setSelectedNode } = useStore();

  if (!selectedNode) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const tierColors = {
    Bronze: 'from-amber-700 to-amber-900',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-amber-500',
    Platinum: 'from-cyan-300 to-blue-400',
    Diamond: 'from-purple-400 to-pink-400'
  };

  const tierBg = {
    Bronze: 'bg-amber-500/10 border-amber-500/30',
    Silver: 'bg-gray-500/10 border-gray-500/30',
    Gold: 'bg-yellow-500/10 border-yellow-500/30',
    Platinum: 'bg-cyan-500/10 border-cyan-500/30',
    Diamond: 'bg-purple-500/10 border-purple-500/30'
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 glass border-l border-odyssey-purple-500/20 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 glass border-b border-odyssey-purple-500/20 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold gradient-text">Node Details</h2>
          <button
            onClick={() => setSelectedNode(null)}
            className="w-8 h-8 rounded-lg bg-odyssey-dark-800 hover:bg-odyssey-dark-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className={`rounded-xl p-4 border ${tierBg[selectedNode.tier]}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tierColors[selectedNode.tier]} flex items-center justify-center shadow-lg`}>
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
                {selectedNode.isHot && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400">Hot</span>
                  </div>
                )}
              </div>
              <span className={`inline-block mt-1 text-sm px-3 py-1 rounded-full bg-gradient-to-r ${tierColors[selectedNode.tier]} text-white font-medium`}>
                {selectedNode.tier} Tier
              </span>
            </div>
          </div>
        </div>

        {/* Wallet & Code */}
        <div className="space-y-3">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-odyssey-purple-400" />
                <span className="text-sm text-odyssey-dark-400">Wallet Address</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedNode.wallet)}
                  className="p-1 hover:bg-odyssey-dark-700 rounded transition-colors"
                >
                  <Copy className="w-3 h-3 text-odyssey-dark-400" />
                </button>
                <a
                  href={`https://etherscan.io/address/${selectedNode.wallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-odyssey-dark-700 rounded transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-odyssey-dark-400" />
                </a>
              </div>
            </div>
            <p className="font-mono text-sm text-white mt-2 break-all">{selectedNode.wallet}</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-odyssey-blue-400" />
                <span className="text-sm text-odyssey-dark-400">Referral Code</span>
              </div>
              <button
                onClick={() => copyToClipboard(selectedNode.referralCode)}
                className="p-1 hover:bg-odyssey-dark-700 rounded transition-colors"
              >
                <Copy className="w-3 h-3 text-odyssey-dark-400" />
              </button>
            </div>
            <p className="font-mono text-lg text-white mt-2">{selectedNode.referralCode}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card text-center">
            <Coins className="w-6 h-6 text-odyssey-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{selectedNode.points.toLocaleString()}</p>
            <p className="text-xs text-odyssey-dark-400">Total Points</p>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-6 h-6 text-odyssey-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{selectedNode.referralPoints.toLocaleString()}</p>
            <p className="text-xs text-odyssey-dark-400">Referral Points</p>
          </div>
          <div className="card text-center">
            <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{selectedNode.directReferrals}</p>
            <p className="text-xs text-odyssey-dark-400">Direct Referrals</p>
          </div>
          <div className="card text-center">
            <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{selectedNode.totalReferrals}</p>
            <p className="text-xs text-odyssey-dark-400">Total Network</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-odyssey-dark-400">Network Level</span>
            <span className="text-lg font-bold text-white">Level {selectedNode.level}</span>
          </div>
          <div className="h-2 bg-odyssey-dark-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-odyssey-purple-500 to-odyssey-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((selectedNode.level / 5) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-odyssey-dark-500">
            <span>Level 0</span>
            <span>Level 5</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="card">
          <h4 className="text-sm font-medium text-odyssey-dark-300 mb-3">Activity Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-white">Joined Odyssey</p>
                <p className="text-xs text-odyssey-dark-400">{formatDate(selectedNode.joinDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-odyssey-blue-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-odyssey-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white">Last Active</p>
                <p className="text-xs text-odyssey-dark-400">{formatDate(selectedNode.lastActive)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Children Preview */}
        {selectedNode.children && selectedNode.children.length > 0 && (
          <div className="card">
            <h4 className="text-sm font-medium text-odyssey-dark-300 mb-3">
              Direct Referrals ({selectedNode.children.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedNode.children.slice(0, 5).map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-odyssey-dark-800/50 hover:bg-odyssey-dark-700/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedNode(child)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tierColors[child.tier]} flex items-center justify-center`}>
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-white">{child.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-odyssey-dark-500" />
                </div>
              ))}
              {selectedNode.children.length > 5 && (
                <p className="text-xs text-odyssey-dark-500 text-center py-2">
                  +{selectedNode.children.length - 5} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDetailPanel;
