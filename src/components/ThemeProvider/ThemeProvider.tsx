import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContext {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [darkMode, rawSetDarkMode] = useState(false);

  const setDarkMode = (value: boolean) => {
    rawSetDarkMode(value);
    if (value) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };

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
};
