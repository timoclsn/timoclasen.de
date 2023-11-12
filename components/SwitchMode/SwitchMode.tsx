"use client";

import clsx from "clsx";
import { Moon, Sun } from "react-feather";
import { useTheme } from "../ThemeContext";
import { useIsMounted } from "../useIsMounted";
import styles from "./SwitchMode.module.css";
import { track } from "../../lib/tracking";

export const SwitchMode = () => {
  const { darkMode, setDarkMode } = useTheme();

  const isMounted = useIsMounted();

  const handleThemeChange = () => {
    setDarkMode?.(!darkMode);
    track("Switch Theme", {
      theme: darkMode ? "dark" : "light",
    });
  };

  return (
    <button
      aria-label="Farbschema wechseln"
      type="button"
      className={clsx(
        "h-8 w-8 flex-none rounded-xl bg-dark bg-opacity-10 text-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight dark:bg-light dark:bg-opacity-10 dark:text-highlight-dark dark:focus-visible:ring-highlight-dark",
        styles.switchMode
      )}
      onClick={handleThemeChange}
      title={`Farbschema zu ${darkMode ? "hell" : "dunkel"} welchseln`}
    >
      {isMounted && (
        <>
          <Sun size={16} data-hide={!darkMode} className={styles.sun} />
          <Moon size={16} data-hide={darkMode} className={styles.moon} />
        </>
      )}
    </button>
  );
};
