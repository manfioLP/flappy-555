'use client';

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {Language, VoiceUS} from "@/utils/types";

// Context properties interface
interface ChatContextProps {
    language: Language;
    setLanguage: Dispatch<SetStateAction<Language>>;
    voice: string;
    setVoice: Dispatch<SetStateAction<string>>;
    audioUrl: string | null;
    setAudioUrl: Dispatch<SetStateAction<string | null>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

// Default context values
export const ChatContext = createContext<ChatContextProps>({
    language: Language.US,
    setLanguage: () => {},
    voice: "",
    setVoice: () => {},
    audioUrl: null,
    setAudioUrl: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
});

interface ChatProviderProps {
    children: ReactNode;
}

// Context provider
export const ContextProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(Language.US);
    const [voice, setVoice] = useState<string>(VoiceUS.HEART);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <ChatContext.Provider
            value={{
                language,
                setLanguage,
                voice,
                setVoice,
                audioUrl,
                setAudioUrl,
                isPlaying,
                setIsPlaying,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom hook for accessing the context
export const useChatContext = () => useContext(ChatContext);
