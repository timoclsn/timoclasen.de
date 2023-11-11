import "../styles/globals.css";
import { Inter } from "next/font/google";

import type { AppProps } from "next/app";

import { ThemeProvider } from "../components/ThemeContext";
import { ToastProvider } from "../components/ToastProvider";
import { trpc } from "../utils/trpc";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
        <ToastProvider />
      </div>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
