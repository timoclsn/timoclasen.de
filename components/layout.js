import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Timo Clasen Website</title>
            </Head>
            <div>{children}</div>
        </div>
    );
}
