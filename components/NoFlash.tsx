export function NoFlash() {
  function setTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
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
