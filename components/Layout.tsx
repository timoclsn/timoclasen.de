import Head from 'next/head';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { CenteredColumn } from './CenteredColumn';
import { Favicons } from './Favicons';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { PreviewAlert } from './PreviewAlert';
import { SEO } from './SEO';

interface PreviewImage {
  url: string;
  description: string;
}

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  previewImage?: PreviewImage;
  slug?: string;
  preview?: boolean;
}

export function Layout({
  children,
  title,
  description,
  previewImage,
  slug,
  preview,
}: Props) {
  const name = 'Timo Clasen';
  const pageTitle = title.includes(name) ? title : `${title}  •  ${name}`;
  slug = slug ? `/${slug}` : '';

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <SEO
        title={pageTitle}
        description={description}
        slug={slug}
        previewImage={previewImage}
        name={name}
      />
      <Favicons />
      {preview && <PreviewAlert />}
      <div className="flex min-h-screen flex-col text-base antialiased lg:text-lg xl:text-xl">
        <Navigation name={name} />
        <main id="skip">
          <CenteredColumn>{children}</CenteredColumn>
        </main>
        <Footer />
      </div>
    </>
  );
}
