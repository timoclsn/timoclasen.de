import '@rainbow-me/rainbowkit/styles.css';

import {
  connectorsForWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import type { ReactNode } from 'react';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { useTheme } from './ThemeContext';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
]);

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
    <WagmiConfig client={wagmiClient}>
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
    </WagmiConfig>
  );
}
