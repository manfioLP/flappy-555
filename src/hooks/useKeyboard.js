import { useEffect } from 'react';

export const useKeyboard = (key, callback) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === key) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [key, callback]);
};

export const useMultipleKeys = (keyMap) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (keyMap[event.code]) {
                event.preventDefault();
                keyMap[event.code]();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [keyMap]);
};