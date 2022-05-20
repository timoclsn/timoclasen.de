import '@rainbow-me/rainbowkit/styles.css';

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import type { ReactNode } from 'react';
import { chain, createClient, WagmiProvider } from 'wagmi';

import { useTheme } from './ThemeContext';

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

interface Props {
  children: ReactNode;
}

export function Web3Provider({ children }: Props) {
  const { darkMode } = useTheme();

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions
        coolMode
        theme={
          darkMode
            ? midnightTheme({
                accentColor: '#4F5FEF',
                accentColorForeground: 'white',
                fontStack: 'rounded',
              })
            : lightTheme({
                accentColor: '#3E51F7',
                accentColorForeground: 'white',
                fontStack: 'rounded',
              })
        }
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
