import { useRef, useCallback, useEffect } from 'react';

export const useGameLoop = (callback, isRunning) => {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = useCallback((time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;

        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [callback, isRunning]);

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isRunning, animate]);

    return requestRef;
};