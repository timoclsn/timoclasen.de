import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html
                className={
                    'font-normal bg-primary dark:bg-primary-dark text-secondary dark:text-secondary-dark'
                }
                lang="de">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;