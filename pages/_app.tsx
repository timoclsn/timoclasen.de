import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import { InjectedConnector, Provider, WalletConnectConnector } from 'wagmi';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { fetcher } from '../lib/fetcher';

const connectors = () => {
  return [
    new InjectedConnector(),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ];
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors}>
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
    </Provider>
  );
}

export default MyApp;
