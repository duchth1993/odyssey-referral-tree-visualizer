import React from 'react';
import { Users, Coins, Flame, Layers, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';

const StatCard = ({ icon: Icon, label, value, color, subValue }) => (
  <div className="card group hover:scale-105">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-odyssey-dark-400 text-sm mb-1">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {subValue && (
          <p className="text-xs text-odyssey-dark-500 mt-1">{subValue}</p>
        )}
      </div>
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.includes('purple') ? 'from-odyssey-purple-500/20 to-odyssey-purple-600/20' : color.includes('blue') ? 'from-odyssey-blue-500/20 to-odyssey-blue-600/20' : color.includes('amber') ? 'from-amber-500/20 to-orange-500/20' : 'from-emerald-500/20 to-teal-500/20'} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
  </div>
);

const StatsPanel = () => {
  const { stats } = useStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <StatCard
        icon={Users}
        label="Total Referrals"
        value={stats.totalNodes.toLocaleString()}
        color="text-odyssey-purple-400"
        subValue="In your network"
      />
      <StatCard
        icon={Coins}
        label="Total Points"
        value={stats.totalPoints.toLocaleString()}
        color="text-odyssey-blue-400"
        subValue="Earned from referrals"
      />
      <StatCard
        icon={Flame}
        label="Hot Chains"
        value={stats.hotChains}
        color="text-amber-400"
        subValue="Top performers"
      />
      <StatCard
        icon={Layers}
        label="Max Depth"
        value={stats.maxDepth}
        color="text-emerald-400"
        subValue="Referral levels"
      />
      <StatCard
        icon={TrendingUp}
        label="Avg Referrals"
        value={stats.avgReferrals}
        color="text-odyssey-purple-400"
        subValue="Per user"
      />
    </div>
  );
};

export default StatsPanel;
