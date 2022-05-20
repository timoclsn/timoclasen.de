import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { Web3Provider } from '../components/Web3Provider';
import { fetcher } from '../lib/fetcher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Web3Provider>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <Component {...pageProps} />
          <ToastProvider />
        </SWRConfig>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
