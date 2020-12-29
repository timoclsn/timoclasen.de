import { NextSeo } from 'next-seo';
import CenteredColumn from './CenteredColumn';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({
    children,
    name,
    title,
    description,
    previewImage,
    slug
}) {
    const pageTitle = title.includes(name) ? title : title + ' • ' + name;
    slug = slug ? slug : '';
    return (
        <>
            <NextSeo
                title={pageTitle}
                description={description}
                canonical={'https://timoclasen.de/' + slug}
                openGraph={{
                    url: 'https://timoclasen.de/' + slug,
                    title: pageTitle,
                    description: description,
                    images: [
                        {
                            url: previewImage.url,
                            width: 1200,
                            height: 630,
                            alt: previewImage.description
                        }
                    ],
                    site_name: name
                }}
            />
            <div
                className={
                    'min-h-screen flex flex-col text-base lg:text-lg antialiased'
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
