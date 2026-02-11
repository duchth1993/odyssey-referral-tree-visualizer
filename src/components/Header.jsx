import React from 'react';
import { Network, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-odyssey-purple-500 to-odyssey-blue-500 flex items-center justify-center shadow-lg shadow-odyssey-purple-500/30">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Odyssey</h1>
            <p className="text-xs text-odyssey-dark-400">Referral Tree Visualizer</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-odyssey-dark-300 hover:text-white transition-colors text-sm font-medium">
            Dashboard
          </a>
          <a href="#" className="text-odyssey-dark-300 hover:text-white transition-colors text-sm font-medium">
            Leaderboard
          </a>
          <a href="#" className="text-odyssey-dark-300 hover:text-white transition-colors text-sm font-medium">
            Rewards
          </a>
          <button className="btn-secondary text-sm">
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
