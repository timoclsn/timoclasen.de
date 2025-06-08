"use client";

import { cx } from "cva";
import { Moon, Sun } from "lucide-react";
import { Skeleton } from "../../design-system/Skeleton/Skeleton";
import { useIsMounted } from "../../hooks/useIsMounted";
import { track } from "../../lib/tracking";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import styles from "./SwitchMode.module.css";

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
      className={cx(
        "focus-visible:outline-hidden h-8 w-8 flex-none overflow-hidden rounded-xl  bg-dark/10 text-highlight focus-visible:ring-2 focus-visible:ring-highlight dark:bg-light/10 dark:text-highlight-dark dark:focus-visible:ring-highlight-dark",
        styles.switchMode,
      )}
      onClick={handleThemeChange}
      title={`Farbschema zu ${darkMode ? "hell" : "dunkel"} welchseln`}
    >
      {isMounted ? (
        <>
          <Sun size={16} data-hide={!darkMode} className={styles.sun} />
          <Moon size={16} data-hide={darkMode} className={styles.moon} />
        </>
      ) : (
        <Skeleton display="block" height="100%" />
      )}
    </button>
  );
};
