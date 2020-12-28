import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicons from '../components/Favicons';

class MyDocument extends Document {
    render() {
        return (
            <Html
                className={
                    'min-h-screen bg-light text-dark dark:bg-dark dark:text-light'
                }
                lang="de">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/Inter-Regular.woff2"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Inter-Bold.woff2"
                        as="font"
                        crossOrigin=""
                    />
                    <Favicons />
                </Head>
                <body className={'min-h-screen'}>
                    <Main />
                    <NextScript />
                    {/*Cloudflare Web Analytics*/}
                    <script
                        defer
                        src="https://static.cloudflareinsights.com/beacon.min.js"
                        data-cf-beacon='{"token": "ec9ecd1863434736b53313eb3fe81317"}'></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
