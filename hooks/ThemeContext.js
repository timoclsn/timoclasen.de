import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, rawSetDarkMode] = useState(undefined);

    useEffect(() => {
        rawSetDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const setDarkMode = (value) => {
        rawSetDarkMode(value);
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
