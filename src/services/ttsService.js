const KOKORO_API_URL = 'http://localhost:8880/v1';

/**
 * Fetches available voices from the Kokoro-FastAPI service
 * @returns {Promise<{single: string[], combinations: string[]}>}
 */
export const getAvailableVoices = async () => {
    try {
        const response = await fetch(`${KOKORO_API_URL}/audio/voices`, {
            headers: {
                'Authorization': 'Bearer not-needed'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch available voices');
        }

        const data = await response.json();
        console.log('Available voices:', data);

        // Organize voices by language/gender prefixes
        const voices = {
            single: data.voices || [],
            combinations: [] // The service currently doesn't support combinations through the API
        };

        return voices;
    } catch (error) {
        console.error('Failed to fetch voices:', error);
        // Fallback to basic voices if fetch fails
        return {
            single: ['af_bella'],
            combinations: []
        };
    }
};

/**
 * OpenAI client instance for Kokoro-FastAPI
 */
class KokoroClient {
    constructor() {
        this.baseUrl = KOKORO_API_URL;
    }

    async createSpeech(input, voice = 'af_bella', model = 'kokoro', format = 'mp3') {
        try {
            console.log('Starting speech generation:', { input, voice, model, format });

            const response = await fetch(`${this.baseUrl}/audio/speech`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer not-needed'
                },
                body: JSON.stringify({
                    model,
                    input,
                    voice,
                    response_format: format
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to generate audio');
            }

            const audioBlob = await response.blob();
            console.log('Audio generated successfully');

            return audioBlob;
        } catch (error) {
            console.error('TTS Generation error:', error);
            throw new Error(`Failed to generate speech: ${error.message}`);
        }
    }

    async createStreamingSpeech(input, voice = 'af_bella', model = 'kokoro', format = 'mp3') {
        try {
            console.log('Starting streaming speech generation:', { input, voice, model, format });

            const response = await fetch(`${this.baseUrl}/audio/speech`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer not-needed'
                },
                body: JSON.stringify({
                    model,
                    input,
                    voice,
                    response_format: format,
                    stream: true
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to generate audio stream');
            }

            return response.body;
        } catch (error) {
            console.error('TTS Streaming error:', error);
            throw new Error(`Failed to generate speech stream: ${error.message}`);
        }
    }
}

// Create a singleton instance
const kokoroClient = new KokoroClient();

/**
 * Generates speech from text using Kokoro-FastAPI
 * @param {string} text - The text to convert to speech
 * @param {string} voice - The voice or voice combination to use
 * @param {boolean} stream - Whether to use streaming for long texts
 * @returns {Promise<Blob|ReadableStream>} - Audio blob or stream
 */
export const generateSpeech = async (text, voice = 'af_bella', stream = false) => {
    try {
        console.log('Starting speech generation:', { text, voice, stream });

        const response = await fetch(`${KOKORO_API_URL}/audio/speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer not-needed'
            },
            body: JSON.stringify({
                model: 'kokoro',
                input: text,
                voice,
                response_format: 'mp3',
                stream
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate audio');
        }

        return stream ? response.body : response.blob();
    } catch (error) {
        console.error('TTS Generation error:', error);
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
};