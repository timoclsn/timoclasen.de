export default function NoFlash() {
    const noFlashScript = `
        (function() {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
        })();`;

    return (
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }}></script>
    );
}
