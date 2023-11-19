import { cx } from "class-variance-authority";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import Script from "next/script";
import { ReactNode } from "react";
import { query } from "../api/query";
import { DraftModeBanner } from "../components/DraftModeBanner/DraftModeBanner";
import { Footer } from "../components/Footer/Footer";
import { Navigation } from "../components/Navigation/Navigation";
import { NoFlash } from "../components/NoFlash/NoFlash";
import { Container } from "../design-system/Container/Container";
import { createGenerateMetadata, openGraph } from "../lib/metadata";
import "../styles/globals.css";
import { Providers } from "./Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description } = await query.content.getMetadata("home");

  return {
    metadataBase: new URL("https://timoclasen.de"),
    title: {
      default: title,
      template: "%s • Timo Clasen",
    },
    description,
    icons: "/favicon.png",
    openGraph: {
      ...(await openGraph(title, description, "/")),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@timoclsn",
      creator: "@timoclsn",
    },
    alternates: {
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
  };
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const isDraftMode = draftMode().isEnabled;
  return (
    <>
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <html
        lang="de"
        className={cx(fontSans.variable, "min-h-screen")}
        suppressHydrationWarning
      >
        <body className="flex min-h-screen flex-col bg-light text-base text-dark antialiased dark:bg-dark dark:text-light lg:text-lg xl:text-xl">
          <NoFlash />
          <Providers>
            {isDraftMode && <DraftModeBanner />}
            <Navigation />
            <main id="skip">
              <Container>{children}</Container>
            </main>
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
