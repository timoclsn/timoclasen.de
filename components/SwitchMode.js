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
                'flex items-center justify-center text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl h-10 w-10 focus:outline-none'
            }
            onClick={handleThemeChange}>
            {mounted && (darkMode ? <Sun size={20} /> : <Moon size={20} />)}
        </button>
    );
}
