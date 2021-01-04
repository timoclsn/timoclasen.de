import CenteredColumn from './CenteredColumn';
import Navigation from './Navigation';
import Footer from './Footer';
import PreviewAlert from './PreviewAlert';
import Favicons from '../components/Favicons';
import SEO from '../components/SEO';
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
