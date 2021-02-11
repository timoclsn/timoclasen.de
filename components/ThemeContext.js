import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, rawSetDarkMode] = useState(undefined);

    useEffect(() => {
        rawSetDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const contextValue = useMemo(() => {
        function setDarkMode(value) {
            rawSetDarkMode(value);
            if (value) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }

        return {
            darkMode,
            setDarkMode
        };
    }, [darkMode, rawSetDarkMode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
