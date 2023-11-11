export function NoFlash() {
  function setTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  }
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${String(setTheme)})();`,
      }}
    ></script>
  );
}
