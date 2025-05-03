import React from 'react';

const Textarea = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor="text-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Enter Text
            </label>
            <textarea
                id="text-input"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Type your text here..."
                value={value}
                onChange={onChange}
                aria-label="Text to convert to speech"
            />
        </div>
    );
};

export default React.memo(Textarea);