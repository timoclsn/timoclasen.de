import '../styles/globals.css';

import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '../components/ThemeContext';
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
          <Toaster position="bottom-center" />
        </SWRConfig>
      </ThemeProvider>
    </IdProvider>
  );
}

export default MyApp;
