import React from 'react';

const AudioOutput = ({ audioUrl, onDownload }) => {
    if (!audioUrl) return null;

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex flex-col space-y-4">
                <div className="relative w-full">
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
                    className="w-full px-5 py-2.5 inline-flex items-center justify-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd" />
                    </svg>


                    Download Audio
                </button>
            </div>
        </div>
    );
};

export default React.memo(AudioOutput);