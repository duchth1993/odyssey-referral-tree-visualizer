import React from 'react';
import { Network, Search, ArrowRight, Sparkles } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center max-w-lg">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-odyssey-purple-500/20 to-odyssey-blue-500/20 rounded-3xl rotate-6" />
          <div className="absolute inset-0 bg-gradient-to-br from-odyssey-purple-500/30 to-odyssey-blue-500/30 rounded-3xl -rotate-6" />
          <div className="relative w-full h-full glass rounded-3xl flex items-center justify-center">
            <Network className="w-16 h-16 text-odyssey-purple-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold gradient-text mb-4">
          Visualize Your Referral Network
        </h2>
        <p className="text-odyssey-dark-400 mb-8 leading-relaxed">
          Enter a wallet address or referral code above to explore the complete referral hierarchy. 
          See who invited whom, track points earned, and identify your top-performing chains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="w-10 h-10 rounded-xl bg-odyssey-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-odyssey-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Search</h3>
            <p className="text-xs text-odyssey-dark-400">Enter wallet or code</p>
          </div>
          <div className="card text-center">
            <div className="w-10 h-10 rounded-xl bg-odyssey-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Network className="w-5 h-5 text-odyssey-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Explore</h3>
            <p className="text-xs text-odyssey-dark-400">Navigate the tree</p>
          </div>
          <div className="card text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Discover</h3>
            <p className="text-xs text-odyssey-dark-400">Find hot chains</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-odyssey-dark-500">
          <span>Powered by</span>
          <span className="gradient-text font-semibold">Odyssey Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
