import React from 'react';

function Textarea({ value, onChange }) {
    return (
        <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
                Enter Text:
            </label>
            <div className="mt-1">
                <textarea
                    id="text-input"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter text to convert to speech"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default Textarea;