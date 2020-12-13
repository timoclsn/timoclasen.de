import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Timo Clasen Website</title>
            </Head>
            <Navigation />
            <div>{children}</div>
            <Footer />
        </>
    );
}
