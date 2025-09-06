import { SpeedInsights } from "@vercel/speed-insights/next";
import { cx } from "cva";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import { query } from "../api/query";
import { DraftModeBanner } from "../components/DraftModeBanner/DraftModeBanner";
import { Footer } from "../components/Footer/Footer";
import { Navigation } from "../components/Navigation/Navigation";
import { NoFlash } from "../components/NoFlash/NoFlash";
import { Container } from "../design-system/Container/Container";
import "../lib/env";
import { createGenerateMetadata, openGraph } from "../lib/metadata";
import "../styles/globals.css";
import { Providers } from "./Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description } = await query.content.metadata("home");

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
  return (
    <>
      <Script src="/ods/script" data-url="/ods/events" />
      <html
        lang="de"
        className={cx(fontSans.variable, "min-h-screen")}
        suppressHydrationWarning
      >
        <body className="bg-light text-dark dark:bg-dark dark:text-light flex min-h-screen flex-col text-base antialiased lg:text-lg xl:text-xl">
          <NoFlash />
          <Providers>
            <DraftModeBanner />
            <Navigation />
            <main id="skip">
              <Container>{children}</Container>
            </main>
            <Footer />
          </Providers>
          <SpeedInsights />
        </body>
      </html>
    </>
  );
};

export default RootLayout;
