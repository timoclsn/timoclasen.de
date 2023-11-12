import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { cx } from "class-variance-authority";
import { NoFlash } from "../components/NoFlash";
import { Navigation } from "../components/Navigation/Navigation";
import { CenteredColumn } from "../components/CenteredColumn";
import { Footer } from "../components/Footer";
import "../styles/globals.css";
import { Providers } from "./Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Timo Clasen",
  description: "Timo Clasen Portfolio",
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
