import Document, { Head, Html, Main, NextScript } from 'next/document';

import NoFlash from '@/components/NoFlash';

class MyDocument extends Document {
    render() {
        return (
            <Html className={'min-h-screen'} lang="de">
                <Head />
                <body
                    className={
                        'min-h-screen bg-light text-dark dark:bg-dark dark:text-light'
                    }>
                    <NoFlash />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
