export default function NoFlash() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `(function() {
                            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                document.documentElement.classList.add('dark');
                            }
                        })();`
            }}></script>
    );
}
