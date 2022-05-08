import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import { chain, createClient, WagmiProvider } from 'wagmi';

import { ThemeProvider } from '../components/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import { fetcher } from '../lib/fetcher';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    apiProvider.alchemy(process.env.NEXT_PUBLIC_ALCHEMY_ID),
    apiProvider.fallback(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'timoclasen.de',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          showRecentTransactions
          coolMode
          theme={{
            lightMode: lightTheme({
              accentColor: '#3E51F7',
              accentColorForeground: 'white',
              fontStack: 'rounded',
            }),
            darkMode: midnightTheme({
              accentColor: '#4F5FEF',
              accentColorForeground: 'white',
              fontStack: 'rounded',
            }),
          }}
        >
          <SWRConfig
            value={{
              fetcher: fetcher,
            }}
          >
            <Component {...pageProps} />
            <ToastProvider />
          </SWRConfig>
        </RainbowKitProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
