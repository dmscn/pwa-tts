import { KokoroTTS } from 'kokoro-js';

let ttsInstance = null;

const initTTS = async () => {
    if (!ttsInstance) {
        console.log('Initializing TTS instance...');
        try {
            ttsInstance = await KokoroTTS.from_pretrained(
                "onnx-community/Kokoro-82M-v1.0-ONNX",
                {
                    dtype: "fp32",  // Using full precision for best quality
                    device: "wasm"   // Using WebAssembly for browser compatibility
                }
            );
            console.log('TTS instance initialized successfully');
        } catch (err) {
            console.error('Failed to initialize TTS:', err);
            throw err;
        }
    }
    return ttsInstance;
};

/**
 * Generates speech from text using Kokoro TTS
 * @param {string} text - The text to convert to speech
 * @returns {Promise<Blob>} - A promise that resolves to an audio blob
 */
export const generateSpeech = async (text) => {
    try {
        console.log('Starting speech generation for text:', text);

        const tts = await initTTS();
        console.log('Got TTS instance, generating audio...');

        // Generate audio with optimal settings
        const { audio } = await tts.generate(text, {
            voice: "af_bella",         // Using Bella's voice for clearer speech
            speaker_emb_noise: 0.1,    // Low noise for clearer pronunciation
            length_penalty: 0.8,       // Natural pacing between words
            temperature: 0.7,          // Consistent pronunciation
            top_k: 20                  // Better phoneme selection
        });
        console.log('Audio generated successfully');

        if (!audio) {
            throw new Error('No audio data received from TTS engine');
        }

        // Convert Float32Array to WAV format
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, audio.length, 24000);
        buffer.getChannelData(0).set(audio);

        // Convert AudioBuffer to WAV Blob
        const wavBlob = await new Promise(resolve => {
            const channels = 1;
            const sampleRate = 24000;
            const bitsPerSample = 16;

            // Create WAV header
            const headerLength = 44;
            const dataLength = audio.length * 2;
            const totalLength = headerLength + dataLength;

            const arrayBuffer = new ArrayBuffer(totalLength);
            const dataView = new DataView(arrayBuffer);

            const writeString = (view, offset, string) => {
                for (let i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            };

            writeString(dataView, 0, 'RIFF');
            dataView.setUint32(4, totalLength - 8, true);
            writeString(dataView, 8, 'WAVE');
            writeString(dataView, 12, 'fmt ');
            dataView.setUint32(16, 16, true);
            dataView.setUint16(20, 1, true);
            dataView.setUint16(22, channels, true);
            dataView.setUint32(24, sampleRate, true);
            dataView.setUint32(28, sampleRate * channels * (bitsPerSample / 8), true);
            dataView.setUint16(32, channels * (bitsPerSample / 8), true);
            dataView.setUint16(34, bitsPerSample, true);
            writeString(dataView, 36, 'data');
            dataView.setUint32(40, dataLength, true);

            // Convert and write audio data
            const samples = new Int16Array(audio.length);
            for (let i = 0; i < audio.length; i++) {
                const s = Math.max(-1, Math.min(1, audio[i]));
                samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }

            new Int16Array(arrayBuffer, 44).set(samples);

            resolve(new Blob([arrayBuffer], { type: 'audio/wav' }));
        });

        return wavBlob;
    } catch (error) {
        console.error('TTS Generation error:', error);
        console.error('Error stack:', error.stack);
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
};