import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

export default function SwitchMode() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    function handleThemeChange() {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        localStorage.removeItem('theme');
    }

    return (
        <button
            aria-label="Farbschema wechseln"
            type="button"
            className={
                'flex items-center justify-center text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl h-10 w-10 focus:outline-none'
            }
            onClick={handleThemeChange}>
            {mounted &&
                (resolvedTheme === 'dark' ? (
                    <Sun size={20} />
                ) : (
                    <Moon size={20} />
                ))}
        </button>
    );
}
