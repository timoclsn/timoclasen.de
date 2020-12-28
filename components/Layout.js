import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import CenteredColumn from './CenteredColumn';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({
    children,
    name,
    title,
    description,
    previewImage
}) {
    const pageTitle = title.includes(name) ? title : title + ' | ' + name;
    return (
        <>
            <NextSeo
                title={pageTitle}
                description={description}
                canonical={'https://timoclasen.de' + useRouter().pathname}
                openGraph={{
                    url: 'https://timoclasen.de' + useRouter().pathname,
                    title: pageTitle,
                    description: description,
                    images: [
                        {
                            url: previewImage,
                            width: 1200,
                            height: 630,
                            alt: pageTitle
                        }
                    ],
                    site_name: name
                }}
            />
            <div
                className={
                    'min-h-screen flex flex-col text-sm md:text-base lg:text-lg antialiased'
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
