/**
 * Language prefix mappings with their corresponding labels and emojis
 */
export const LANGUAGE_MAPPINGS = {
    a: { label: 'American English', emoji: '🇺🇸' },
    b: { label: 'British English', emoji: '🇬🇧' },
    e: { label: 'Spanish', emoji: '🇪🇸' },
    f: { label: 'French', emoji: '🇫🇷' },
    h: { label: 'Hindi', emoji: '🇮🇳' },
    i: { label: 'Italian', emoji: '🇮🇹' },
    j: { label: 'Japanese', emoji: '🇯🇵' },
    p: { label: 'Brazilian Portuguese', emoji: '🇧🇷' },
    z: { label: 'Mandarin Chinese', emoji: '🇨🇳' }
};

/**
 * Format a voice ID into a user-friendly display name
 * @param {string} voiceId - The voice ID (e.g., "af_bella")
 * @returns {string} Formatted voice name with language and emoji
 */
export const formatVoiceName = (voiceId) => {
    const [prefix, name] = voiceId.split('_');
    const language = prefix[0]; // First letter is language
    const languageInfo = LANGUAGE_MAPPINGS[language];

    if (!languageInfo) return voiceId;

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    return `${languageInfo.emoji} ${languageInfo.label} - ${formattedName}`;
};