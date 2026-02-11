import React from 'react';
import { 
  User, Wallet, Hash, Calendar, Clock, Award, 
  Users, Coins, TrendingUp, Flame 
} from 'lucide-react';

const NodeTooltip = ({ node, position }) => {
  if (!node) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatWallet = (wallet) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  const tierColors = {
    Bronze: 'from-amber-700 to-amber-900',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-amber-500',
    Platinum: 'from-cyan-300 to-blue-400',
    Diamond: 'from-purple-400 to-pink-400'
  };

  return (
    <div
      className="tooltip glass rounded-xl p-4 w-72 shadow-2xl"
      style={{
        left: position.x + 20,
        top: position.y - 10,
        opacity: 1
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierColors[node.tier]} flex items-center justify-center shadow-lg`}>
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{node.name}</h3>
            {node.isHot && <Flame className="w-4 h-4 text-amber-400" />}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${tierColors[node.tier]} text-white`}>
            {node.tier}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-odyssey-dark-300">
          <Wallet className="w-4 h-4 text-odyssey-purple-400" />
          <span className="font-mono">{formatWallet(node.wallet)}</span>
        </div>
        <div className="flex items-center gap-2 text-odyssey-dark-300">
          <Hash className="w-4 h-4 text-odyssey-blue-400" />
          <span className="font-mono">{node.referralCode}</span>
        </div>
      </div>

      <div className="h-px bg-odyssey-dark-700 my-3" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-odyssey-dark-800/50 rounded-lg p-2">
          <div className="flex items-center gap-1 text-odyssey-dark-400 text-xs mb-1">
            <Coins className="w-3 h-3" />
            <span>Points</span>
          </div>
          <p className="font-bold text-odyssey-purple-400">{node.points.toLocaleString()}</p>
        </div>
        <div className="bg-odyssey-dark-800/50 rounded-lg p-2">
          <div className="flex items-center gap-1 text-odyssey-dark-400 text-xs mb-1">
            <TrendingUp className="w-3 h-3" />
            <span>Referral Pts</span>
          </div>
          <p className="font-bold text-odyssey-blue-400">{node.referralPoints.toLocaleString()}</p>
        </div>
        <div className="bg-odyssey-dark-800/50 rounded-lg p-2">
          <div className="flex items-center gap-1 text-odyssey-dark-400 text-xs mb-1">
            <Users className="w-3 h-3" />
            <span>Direct</span>
          </div>
          <p className="font-bold text-emerald-400">{node.directReferrals}</p>
        </div>
        <div className="bg-odyssey-dark-800/50 rounded-lg p-2">
          <div className="flex items-center gap-1 text-odyssey-dark-400 text-xs mb-1">
            <Award className="w-3 h-3" />
            <span>Level</span>
          </div>
          <p className="font-bold text-amber-400">{node.level}</p>
        </div>
      </div>

      <div className="h-px bg-odyssey-dark-700 my-3" />

      {/* Dates */}
      <div className="flex justify-between text-xs text-odyssey-dark-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Joined {formatDate(node.joinDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(node.lastActive)}</span>
        </div>
      </div>
    </div>
  );
};

export default NodeTooltip;
