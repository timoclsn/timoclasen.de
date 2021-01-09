import Document, { Head, Html, Main, NextScript } from 'next/document';

import { analyticsId } from '@/lib/analytics';

const prod = process.env.NODE_ENV === 'production';

class MyDocument extends Document {
    render() {
        return (
            <Html
                className={
                    'min-h-screen bg-light text-dark dark:bg-dark dark:text-light'
                }
                lang="de">
                <Head />
                <body className={'min-h-screen'}>
                    <Main />
                    <NextScript />
                    {prod && (
                        <script
                            defer
                            src="https://static.cloudflareinsights.com/beacon.min.js"
                            data-cf-beacon={`{"token": "${analyticsId}"}`}
                        />
                    )}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
