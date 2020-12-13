import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Layout({ children, data }) {
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Navigation />
            <div className={'max-w-screen-sm mx-auto'}>{children}</div>
            <Footer />
        </>
    );
}
