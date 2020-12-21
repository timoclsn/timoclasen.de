import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Layout({
    children,
    name,
    title,
    description,
    twitterHandle,
    previewImage,
    keywords
}) {
    const pageTitle = name + ' | ' + title;
    return (
        <>
            <Head>
                <title>{pageTitle}</title>

                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta charset="utf-8" />
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
                <meta
                    property="og:site_name"
                    content={pageTitle}
                    key="ogsitename"
                />
                <meta property="og:title" content={pageTitle} key="ogtitle" />
                <meta
                    property="og:description"
                    content={description}
                    key="ogdesc"
                />
            </Head>
            <Navigation name={name} title={title} />
            <div className={'max-w-screen-sm mx-auto'}>{children}</div>
            <Footer />
        </>
    );
}
