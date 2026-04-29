import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

const ErrorDisplay = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600 max-w-md mb-6">
                {message || "We encountered an error while loading this content. Please try again later."}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                    <RefreshCcw size={18} />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorDisplay;
