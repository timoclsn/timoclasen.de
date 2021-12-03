import '../styles/globals.css';

import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { fetcher } from '../lib/fetcher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <ThemeProvider>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <Component {...pageProps} />
          <ToastProvider />
        </SWRConfig>
      </ThemeProvider>
    </IdProvider>
  );
}

export default MyApp;
