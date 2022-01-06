import clsx from 'clsx';
import { Moon, Sun } from 'react-feather';

import { useTheme } from '../ThemeContext';
import { useIsMounted } from '../useIsMounted';
import styles from './SwitchMode.module.css';

export function SwitchMode() {
  const { darkMode, setDarkMode } = useTheme();

  const isMounted = useIsMounted();

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
      {isMounted && (
        <>
          <Sun size={16} data-hide={!darkMode} className={styles.sun} />
          <Moon size={16} data-hide={darkMode} className={styles.moon} />
        </>
      )}
    </button>
  );
}
