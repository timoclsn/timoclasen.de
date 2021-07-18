import { useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

import { ThemeContext } from './ThemeContext';

export function SwitchMode() {
    const [mounted, setMounted] = useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    function handleThemeChange() {
        setDarkMode?.(!darkMode);
        splitbee.track('Switch Theme', {
            theme: darkMode ? 'dark' : 'light'
        });
    }

    return (
        <button
            aria-label="Farbschema wechseln"
            type="button"
            className="flex items-center justify-center flex-none w-8 h-8 text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-highlight-dark"
            onClick={handleThemeChange}
            title={`Farbschema zu ${darkMode ? 'hell' : 'dunkel'} welchseln`}>
            {mounted && (darkMode ? <Sun size={16} /> : <Moon size={16} />)}
        </button>
    );
}
