import React from 'react';
import { Network } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-odyssey-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-odyssey-purple-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-odyssey-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Network className="w-8 h-8 text-odyssey-purple-400 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-semibold gradient-text mb-2">Building Your Referral Tree</h3>
        <p className="text-odyssey-dark-400 text-sm">Fetching network data and calculating relationships...</p>
        
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-odyssey-purple-500"
              style={{
                animation: 'bounce 1s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
