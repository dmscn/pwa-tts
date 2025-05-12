import React from 'react';
import { useVoiceSelection } from '../hooks/useVoiceSelection';
import { formatVoiceName } from '../constants/voiceMappings';

const VoiceSelect = ({ onVoiceChange }) => {
    const {
        voices,
        selectedVoice,
        setSelectedVoice,
        loading,
        error
    } = useVoiceSelection();

    const handleChange = (e) => {
        setSelectedVoice(e.target.value);
        onVoiceChange?.(e.target.value);
    };

    return (
        <div className="mb-4">
            <label
                htmlFor="voice-select"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Select Voice
            </label>
            <select
                id="voice-select"
                value={selectedVoice}
                onChange={handleChange}
                disabled={loading}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {loading ? (
                    <option>Loading voices...</option>
                ) : error ? (
                    <option>Error loading voices</option>
                ) : voices.single.length === 0 ? (
                    <option>No voices available</option>
                ) : (
                    voices.single.map(voice => (
                        <option key={voice} value={voice}>
                            {formatVoiceName(voice)}
                        </option>
                    ))
                )}
                {!loading && !error && voices.combinations?.length > 0 && (
                    voices.combinations.map(voice => (
                        <option key={voice} value={voice}>
                            {formatVoiceName(voice)}
                        </option>
                    ))
                )}
            </select>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default React.memo(VoiceSelect);