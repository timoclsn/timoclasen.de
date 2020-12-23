import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Layout({
    children,
    title,
    description,
    twitterHandle,
    previewImage,
    keywords,
    name,
    profession
}) {
    const pageTitle = title + ' | ' + name;
    return (
        <>
            <Head>
                <title>{pageTitle}</title>

                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={name} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" key="twcard" />
                <meta
                    name="twitter:creator"
                    content={'@' + twitterHandle}
                    key="twhandle"
                />

                {/* Open Graph */}
                <meta
                    property="og:image"
                    content={previewImage}
                    key="ogimage"
                />
                <meta property="og:site_name" content={name} key="ogsitename" />
                <meta property="og:title" content={pageTitle} key="ogtitle" />
                <meta
                    property="og:description"
                    content={description}
                    key="ogdesc"
                />

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
            </Head>
            <Navigation name={name} profession={profession} />
            <main className={'flex flex-col items-center space-y-16'}>
                {children}
            </main>
            <Footer />
        </>
    );
}
