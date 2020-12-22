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
                <body className={'p-6'}>
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
