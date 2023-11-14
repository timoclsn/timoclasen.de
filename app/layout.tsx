import { cx } from "class-variance-authority";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import { CenteredColumn } from "../components/CenteredColumn";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation/Navigation";
import { NoFlash } from "../components/NoFlash";
import { getMetadata } from "../data/content";
import { createGenerateMetadata, openGraph } from "../lib/metadata";
import "../styles/globals.css";
import { Providers } from "./Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description } = await getMetadata("home");

  return {
    metadataBase: new URL("https://timoclasen.de"),
    title: {
      default: title,
      template: "%s • Timo Clasen",
    },
    description,
    icons: "/favicon.png",
    openGraph: {
      ...openGraph(title, description, "/"),
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
            <Navigation />
            <main id="skip">
              <CenteredColumn>{children}</CenteredColumn>
            </main>
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
