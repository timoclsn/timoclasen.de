import CenteredColumn from './CenteredColumn';
import Navigation from './Navigation';
import Footer from './Footer';
import PreviewAlert from './PreviewAlert';
import Favicons from '../components/Favicons';
import Head from 'next/head';

export default function Layout({
    children,
    title,
    description,
    previewImage,
    slug,
    preview
}) {
    const name = 'Timo Clasen';
    const pageTitle = title.includes(name) ? title : title + ' • ' + name;
    slug = slug ? '/' + slug : '';

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                    key="viewport"
                />
                <link
                    rel="preload"
                    href="/fonts/Inter-roman.var.woff2"
                    as="font"
                    crossOrigin=""
                />

                <Favicons />

                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content={description}
                    key="description"
                />
                <link
                    rel="canonical"
                    href={`https://timoclasen.de${slug}`}
                    key="canonical"
                />

                <meta property="og:type" content="website" key="og:type" />
                <meta
                    property="og:site_name"
                    content={name}
                    key="og:site_name"
                />
                <meta property="og:locale" content="de" key="og:locale" />
                <meta
                    property="og:url"
                    content={`https://timoclasen.de${slug}`}
                    key="og:url"
                />
                <meta property="og:title" content={pageTitle} key="og:title" />
                <meta
                    property="og:description"
                    content={description}
                    key="og:description"
                />
                <meta
                    property="og:image"
                    content={previewImage.url}
                    key="og:image"
                />
                <meta
                    property="og:image:alt"
                    content={previewImage.description}
                    key="og:image:alt"
                />
                <meta
                    property="og:image:width"
                    content="1200"
                    key="og:image:width"
                />
                <meta
                    property="og:image:height"
                    content="630"
                    key="og:image:height"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                    key="twitter:card"
                />
                <meta
                    name="twitter:title"
                    content={pageTitle}
                    key="twitter:title"
                />
                <meta
                    name="twitter:description"
                    content={description}
                    key="twitter:description"
                />
                <meta
                    name="twitter:site"
                    content="@timoclsn"
                    key="twitter:site"
                />
                <meta
                    name="twitter:creator"
                    content="@timoclsn"
                    key="twitter:creator"
                />
            </Head>

            {preview && <PreviewAlert />}

            <div
                className={
                    'min-h-screen flex flex-col text-base lg:text-lg xl:text-xl antialiased'
                }>
                <Navigation name={name} />
                <main>
                    <CenteredColumn>{children}</CenteredColumn>
                </main>
                <Footer />
            </div>
        </>
    );
}
