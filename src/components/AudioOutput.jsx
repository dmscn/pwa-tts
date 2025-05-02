import React from 'react';

const AudioOutput = ({ audioUrl, onDownload }) => {
    if (!audioUrl) return null;

    return (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <audio
                controls
                className="w-full"
                src={audioUrl}
                preload="metadata"
            >
                Your browser does not support the audio element.
            </audio>
            <button
                onClick={onDownload}
                className="w-full px-4 py-2 text-blue-600 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 focus:ring-4 focus:ring-blue-300"
            >
                Download Audio
            </button>
        </div>
    );
};

export default AudioOutput;