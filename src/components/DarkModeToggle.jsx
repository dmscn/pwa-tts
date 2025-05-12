import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <div className="fixed bottom-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-toggle shadow-lg border border-gray-200/20 dark:border-gray-700/30 transition-all duration-300 z-50">
            <label
                className="relative inline-flex items-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Toggle dark mode"
                />
                <div
                    className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    role="presentation"
                ></div>
                <span
                    className="ms-2 text-xs font-medium text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                >
                    {isDarkMode ? '🌙' : '☀️'}
                </span>
            </label>
        </div>
    );
};

export default DarkModeToggle;