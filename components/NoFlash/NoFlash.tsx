"use client";

export const NoFlash = () => {
  const setTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  };
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${String(setTheme)})();`,
      }}
    ></script>
  );
};
