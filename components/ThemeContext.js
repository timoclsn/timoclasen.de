import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, rawSetDarkMode] = useState(undefined);

    function setDarkMode(value) {
        rawSetDarkMode(value);
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    function mqListener(e) {
        setDarkMode(e.matches);
    }

    useEffect(() => {
        rawSetDarkMode(document.documentElement.classList.contains('dark'));

        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.addEventListener('change', mqListener);

        return () => darkThemeMq.removeEventListener('change', mqListener);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}
