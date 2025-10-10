// Define allowed languages
export enum Language {
    US = "en-us",
    UK = "en-gb",
}

// Define allowed voices for each language
export enum VoiceUS {
    HEART = "heart",
    NEON = "neon",
    SKY = "sky",
    STAR = "star",
}

export enum VoiceUK {
    MELODY = "melody",
    MUSE = "muse",
}

// Type for a single voice option
export interface VoiceOption {
    label: string; // Display name of the voice
    emoji: string; // Emoji for the voice
    value: string; // Actual value of the voice
}

// Mapping of languages to their respective voice options
export type VoicesByLanguage = Record<Language, VoiceOption[]>;
