import { useEffect, useState } from 'react';

export function useThemeDetector() {
    if (!isBrowser()) {
        return false;
    }

    const [isDarkTheme, setIsDarkTheme] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    function mqListener(e) {
        setIsDarkTheme(e.matches);
    }

    useEffect(() => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.addEventListener('change', mqListener);
        return () => darkThemeMq.removeEventListener('change', mqListener);
    }, []);

    return isDarkTheme;
}

function isBrowser() {
    return typeof window !== 'undefined';
}
