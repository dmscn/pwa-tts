import React from 'react';

const AudioOutput = ({ audioUrl, onDownload }) => {
    if (!audioUrl) return null;

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex flex-col space-y-4">
                <div className="relative">
                    <audio
                        controls
                        className="w-full [&::-webkit-media-controls-panel]:bg-gray-200 dark:[&::-webkit-media-controls-panel]:bg-gray-700 [&::-webkit-media-controls-current-time-display]:text-gray-900 dark:[&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-gray-900 dark:[&::-webkit-media-controls-time-remaining-display]:text-white"
                        src={audioUrl}
                        preload="metadata"
                    >
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <button
                    onClick={onDownload}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center w-full transition-all duration-200"
                >
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 15h.01M15 11h.01M4 11h.01M15 7h.01M4 7h.01M8 3h4l2 3H6L8 3Z" />
                    </svg>
                    Download Audio
                </button>
            </div>
        </div>
    );
};

export default React.memo(AudioOutput);