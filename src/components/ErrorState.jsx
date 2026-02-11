import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import useStore from '../store/useStore';

const ErrorState = ({ message }) => {
  const { clearData } = useStore();

  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Something Went Wrong
        </h2>
        <p className="text-odyssey-dark-400 mb-6">
          {message || 'Failed to fetch referral data. Please check your input and try again.'}
        </p>

        <button
          onClick={clearData}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
