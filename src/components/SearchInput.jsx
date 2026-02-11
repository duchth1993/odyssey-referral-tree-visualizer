import React, { useState } from 'react';
import { Search, Wallet, Hash, ArrowRight, Loader2 } from 'lucide-react';
import useStore from '../store/useStore';

const SearchInput = () => {
  const [input, setInput] = useState('');
  const { fetchTreeData, isLoading } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      fetchTreeData(input.trim());
    }
  };

  const isWalletAddress = input.startsWith('0x') && input.length === 42;
  const isReferralCode = input.toUpperCase().startsWith('ODY-');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-odyssey-purple-500 to-odyssey-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative glass rounded-2xl p-2">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-odyssey-purple-500/20 to-odyssey-blue-500/20 flex items-center justify-center">
                {isWalletAddress ? (
                  <Wallet className="w-5 h-5 text-odyssey-purple-400" />
                ) : isReferralCode ? (
                  <Hash className="w-5 h-5 text-odyssey-blue-400" />
                ) : (
                  <Search className="w-5 h-5 text-odyssey-dark-400" />
                )}
              </div>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter wallet address (0x...) or referral code (ODY-...)"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-odyssey-dark-500 text-lg"
                disabled={isLoading}
              />
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-odyssey-purple-500 to-odyssey-blue-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-odyssey-purple-500/30 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setInput('0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21')}
          className="text-xs text-odyssey-dark-400 hover:text-odyssey-purple-400 transition-colors"
        >
          Try sample wallet
        </button>
        <span className="text-odyssey-dark-600">•</span>
        <button
          onClick={() => setInput('ODY-ALPHA1')}
          className="text-xs text-odyssey-dark-400 hover:text-odyssey-blue-400 transition-colors"
        >
          Try sample code
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
