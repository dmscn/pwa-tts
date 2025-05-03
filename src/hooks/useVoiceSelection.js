import { useState, useEffect } from 'react';
import { getAvailableVoices } from '../services/ttsService';

export const useVoiceSelection = () => {
    const [voices, setVoices] = useState({ single: [], combinations: [] });
    const [selectedVoice, setSelectedVoice] = useState('af_bella');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const availableVoices = await getAvailableVoices();
                setVoices(availableVoices);

                // Update selected voice if current one isn't available
                if (availableVoices.single.length > 0 && !availableVoices.single.includes(selectedVoice)) {
                    setSelectedVoice(availableVoices.single[0]);
                }
            } catch (err) {
                console.error('Failed to fetch voices:', err);
                setError('Failed to load available voices');
            } finally {
                setLoading(false);
            }
        };

        fetchVoices();
    }, []);

    return {
        voices,
        selectedVoice,
        setSelectedVoice,
        loading,
        error
    };
};