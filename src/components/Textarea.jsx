import React from 'react';

const Textarea = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text
            </label>
            <textarea
                id="text-input"
                rows={4}
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your text here..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Textarea;