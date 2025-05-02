const KOKORO_API_URL = 'http://localhost:8880/v1';

/**
 * Generates speech from text using Kokoro-FastAPI
 * @param {string} text - The text to convert to speech
 * @returns {Promise<Blob>} - A promise that resolves to an audio blob
 */
export const generateSpeech = async (text) => {
    try {
        console.log('Starting speech generation for text:', text);

        const response = await fetch(`${KOKORO_API_URL}/audio/speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer not-needed'  // Default API key as per documentation
            },
            body: JSON.stringify({
                model: 'kokoro',
                input: text,
                voice: 'af_bella',
                response_format: 'mp3'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`TTS API Error: ${error.message || 'Unknown error'}`);
        }

        const audioBlob = await response.blob();
        console.log('Audio generated successfully');
        
        return audioBlob;
    } catch (error) {
        console.error('TTS Generation error:', error);
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
};