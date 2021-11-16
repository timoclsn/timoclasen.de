import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

import { ThemeContext } from '../ThemeContext';
import styles from './SwitchMode.module.css';

export function SwitchMode() {
  const [mounted, setMounted] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  function handleThemeChange() {
    setDarkMode?.(!darkMode);
    splitbee.track('Switch Theme', {
      theme: darkMode ? 'dark' : 'light',
    });
  }

  return (
    <button
      aria-label="Farbschema wechseln"
      type="button"
      className={clsx(
        'flex-none w-8 h-8 text-highlight dark:text-highlight-dark bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-highlight-dark',
        styles.switchMode
      )}
      onClick={handleThemeChange}
      title={`Farbschema zu ${darkMode ? 'hell' : 'dunkel'} welchseln`}
    >
      {mounted && (
        <>
          <Sun size={16} data-hide={!darkMode} className={styles.sun} />
          <Moon size={16} data-hide={darkMode} className={styles.moon} />
        </>
      )}
    </button>
  );
}
