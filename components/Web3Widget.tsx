import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';

import { Button } from './Button';

export function Web3Widget() {
  const { address } = useAccount();
  const { config } = usePrepareSendTransaction({
    request: {
      to: 'timoclasen.eth',
      value: BigNumber.from('1000000000000000'), // 0,001 ETH in WEI
    },
  });
  const { isLoading: transactionLoading, sendTransaction } =
    useSendTransaction(config);

  const sendETH = async () => sendTransaction?.();

  return (
    <div id="web3" className="flex justify-center">
      <div className="flex w-full max-w-screen-sm flex-col space-y-4 rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-12">
        <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">Web3</h2>
        {!address && (
          <p className="text-md opacity-60 md:text-lg lg:text-xl">
            Mein kleiner Crypto-Spielplatz. Verbinde dein{' '}
            <a
              href="https://ethereum.org/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ethereum
            </a>{' '}
            Wallet (z.B.{' '}
            <a
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>{' '}
            oder{' '}
            <a
              href="https://rainbow.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rainbow
            </a>
            ) und lass dir einige Daten anzeigen.
          </p>
        )}
        <div className="flex justify-center">
          <ConnectButton label="Wallet verbinden" />
        </div>
        {address && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button
              variant="solid"
              size="small"
              onClick={() => sendETH()}
              disabled={transactionLoading}
              title="0.001 ETH senden"
            >
              ☕️ Buy me a coffee
            </Button>
            <Button
              as="a"
              variant="ghost"
              size="small"
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Transaktionen anzeigen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
