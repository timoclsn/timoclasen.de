import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

export default function SwitchMode() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return (
        <button
            aria-label="Farbschema wechseln"
            type="button"
            className={
                'flex items-center justify-center text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl h-10 w-10 focus:outline-none'
            }
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {mounted &&
                (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
        </button>
    );
}
