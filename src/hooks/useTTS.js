import { useState, useEffect, useCallback } from 'react';
import { generateSpeech } from '../services/ttsService';

export const useTTS = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState('af_bella');
    const [useStreaming, setUseStreaming] = useState(false);

    // Cleanup function for URL objects
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    const handleGenerate = useCallback(async () => {
        setLoading(true);
        setError(null);
        setAudioUrl(null); // Clear previous audio

        try {
            if (!text.trim()) {
                throw new Error('Please enter some text to convert');
            }

            if (useStreaming) {
                const stream = await generateSpeech(text, selectedVoice, true);
                const mediaSource = new MediaSource();
                const url = URL.createObjectURL(mediaSource);
                setAudioUrl(url);

                mediaSource.addEventListener('sourceopen', async () => {
                    const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
                    const reader = stream.getReader();

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        sourceBuffer.appendBuffer(value);
                    }

                    mediaSource.endOfStream();
                });
            } else {
                const audioBlob = await generateSpeech(text, selectedVoice, false);

                if (!(audioBlob instanceof Blob)) {
                    throw new Error('Invalid audio data received');
                }

                // Revoke previous URL to prevent memory leaks
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }

                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            }
        } catch (err) {
            console.error('Generation failed:', err);
            setError(err.message || 'Failed to generate audio. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [text, selectedVoice, useStreaming, audioUrl]);

    const handleDownload = useCallback(() => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `tts-output-${Date.now()}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [audioUrl]);

    return {
        text,
        setText,
        loading,
        error,
        audioUrl,
        selectedVoice,
        setSelectedVoice,
        useStreaming,
        setUseStreaming,
        handleGenerate,
        handleDownload
    };
};