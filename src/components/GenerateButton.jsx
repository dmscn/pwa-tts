import React from 'react';

const GenerateButton = ({ onGenerate, isLoading, error }) => {
    return (
        <div className="text-center">
            <button
                onClick={onGenerate}
                disabled={isLoading}
                className="w-full px-4 py-2 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                        Generating...
                    </div>
                ) : (
                    'Generate'
                )}
            </button>
            {error && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default GenerateButton;