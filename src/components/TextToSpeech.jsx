import React, { useState } from 'react';
import Textarea from './Textarea';
import GenerateButton from './GenerateButton';
import AudioOutput from './AudioOutput';
import { generateSpeech } from '../services/ttsService';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setAudioUrl(null); // Clear previous audio

        try {
            if (!text.trim()) {
                throw new Error('Please enter some text to convert');
            }

            const audioBlob = await generateSpeech(text);

            // Validate the blob
            if (!(audioBlob instanceof Blob)) {
                throw new Error('Invalid audio data received');
            }

            // Revoke previous URL to prevent memory leaks
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }

            const url = URL.createObjectURL(audioBlob);
            console.log('Created audio URL:', url);
            setAudioUrl(url);
        } catch (err) {
            console.error('Generation failed:', err);
            setError(err.message || 'Failed to generate audio. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = `tts-output-${Date.now()}.wav`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Cleanup URLs when component unmounts
    React.useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    return (
        <div className="space-y-4">
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <GenerateButton
                onGenerate={handleGenerate}
                isLoading={loading}
                error={error}
            />
            <AudioOutput
                audioUrl={audioUrl}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default TextToSpeech;