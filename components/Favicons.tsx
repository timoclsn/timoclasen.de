import Head from 'next/head';

export function Favicons() {
    return (
        <Head>
            <link rel="icon" type="image/png" href="/favicons/favicon.png" />
            <link
                rel="icon"
                type="image/svg+xml"
                href="/favicons/favicon.svg"
            />
            <link
                rel="apple-touch-icon"
                href="/favicons/favicon-apple-touch.png"
            />
            <link rel="manifest" href="/favicons/manifest.webmanifest" />
            <meta name="theme-color" content="#3E51F7" />
        </Head>
    );
}
