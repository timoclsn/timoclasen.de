import "../styles/globals.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "../components/ThemeContext";
import { ToastProvider } from "../components/ToastProvider";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ToastProvider />
    </ThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
