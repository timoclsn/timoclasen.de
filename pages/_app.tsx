import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { fetcher } from '../lib/fetcher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
