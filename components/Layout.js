import Head from 'next/head';

import CenteredColumn from '@/components/CenteredColumn';
import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PreviewAlert from '@/components/PreviewAlert';
import SEO from '@/components/SEO';

export default function Layout({
    children,
    title,
    description,
    previewImage,
    slug,
    preview
}) {
    const name = 'Timo Clasen';
    const pageTitle = title.includes(name) ? title : `${title}  •  ${name}`;
    slug = slug ? `/${slug}` : '';

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
                    href="/fonts/inter-var-latin.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <SEO
                title={pageTitle}
                description={description}
                slug={slug}
                previewImage={previewImage}
                name={name}
            />
            <Favicons />
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
