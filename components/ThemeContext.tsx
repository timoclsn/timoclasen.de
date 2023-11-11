import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContext {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<Partial<ThemeContext>>({});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProvider {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProvider) {
  const [darkMode, rawSetDarkMode] = useState<boolean>();

  function setDarkMode(value: boolean) {
    rawSetDarkMode(value);
    if (value) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "";
    }
  }

  useEffect(() => {
    rawSetDarkMode(document.documentElement.classList.contains("dark"));

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", (e) => setDarkMode(e.matches));

    return () =>
      darkThemeMq.removeEventListener("change", (e) => setDarkMode(e.matches));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
