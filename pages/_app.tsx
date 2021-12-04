import '../styles/globals.css';

import { IdProvider } from '@radix-ui/react-id';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { fetcher } from '../lib/fetcher';

const getLibrary = (provider: any) =>
  new ethers.providers.Web3Provider(provider);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
}

export default MyApp;
