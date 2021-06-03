import Head from 'next/head';

// favicon.ico in the root of website as backup

export function Favicons() {
    return (
        <Head>
            <link rel="icon" href="/favicons/favicon.ico" />
            <link
                rel="icon"
                href="/favicons/favicon.svg"
                type="image/svg+xml"
            />
            <link
                rel="apple-touch-icon"
                href="/favicons/apple-touch-icon.png"
            />
            <link rel="manifest" href="/favicons/manifest.webmanifest" />
        </Head>
    );
}
