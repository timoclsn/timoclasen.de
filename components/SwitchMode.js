import { useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

import { ThemeContext } from '@/components/ThemeContext';

export default function SwitchMode() {
    const [mounted, setMounted] = useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    return (
        <button
            aria-label="Farbschema wechseln"
            type="button"
            className={
                'flex items-center justify-center text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl h-8 w-8 focus:outline-none'
            }
            onClick={handleThemeChange}
            title={`Farbschema zu ${darkMode ? 'hell' : 'dunkel'} welchseln`}>
            {mounted && (darkMode ? <Sun size={16} /> : <Moon size={16} />)}
        </button>
    );
}
