import React from 'react';
import Textarea from './Textarea';
import GenerateButton from './GenerateButton';
import AudioOutput from './AudioOutput';
import VoiceSelect from './VoiceSelect';
import { useTTS } from '../hooks/useTTS';

const TextToSpeech = () => {
    const {
        text,
        setText,
        loading,
        error,
        audioUrl,
        useStreaming,
        setUseStreaming,
        handleGenerate,
        handleDownload,
        setSelectedVoice
    } = useTTS();

    // Ensure audio section is not visible during generation
    const showAudioSection = !loading && audioUrl;

    return (
        <div className="space-y-4">
            <VoiceSelect onVoiceChange={setSelectedVoice} />

            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center mb-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={useStreaming}
                        onChange={(e) => setUseStreaming(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Use streaming for long texts
                    </span>
                </label>
            </div>

            <div className="space-y-4">
                <GenerateButton
                    onGenerate={handleGenerate}
                    isLoading={loading}
                    error={error}
                />

                {showAudioSection && (
                    <AudioOutput
                        audioUrl={audioUrl}
                        onDownload={handleDownload}
                    />
                )}
            </div>
        </div>
    );
};

export default TextToSpeech;