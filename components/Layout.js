import Head from 'next/head';

import CenteredColumn from '@/components/CenteredColumn';
import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PreviewAlert from '@/components/PreviewAlert';
import SEO from '@/components/SEO';
import { getCssString } from '@/mauli/stitches.config';

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
                <style
                    id="stitches"
                    dangerouslySetInnerHTML={{ __html: getCssString() }}
                />
                <link
                    rel="preload"
                    href="/fonts/inter-var-latin.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <script async data-no-cookie data-api="/_hive" src="/bee.js" />
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
            <div className="flex flex-col min-h-screen text-base antialiased lg:text-lg xl:text-xl">
                <Navigation name={name} />
                <main id="skip">
                    <CenteredColumn>{children}</CenteredColumn>
                </main>
                <Footer />
            </div>
        </>
    );
}
