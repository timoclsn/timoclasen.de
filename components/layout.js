import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Timo Clasen Website Test</title>
            </Head>
            <div>{children}</div>
        </div>
    );
}
