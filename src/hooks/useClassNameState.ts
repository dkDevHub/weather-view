/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from "react";

export const useClassNameState = (className: string, isActiveDependency: boolean, minDuration: number = 300) => {
    const [shouldRenderClass, setShouldRenderClass] = useState(false);
    const lastStartRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActiveDependency) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            lastStartRef.current = Date.now();
            setShouldRenderClass(true);
        } else if (shouldRenderClass) {
            const passedTime = Date.now() - lastStartRef.current;
            const remainingTime = minDuration - passedTime;

            if (remainingTime > 0) {
                timeoutRef.current = setTimeout(() => {
                    setShouldRenderClass(false);
                }, remainingTime);
            } else {
                setShouldRenderClass(false);
            }
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isActiveDependency, minDuration, shouldRenderClass]);

    return shouldRenderClass ? className : "";
};
