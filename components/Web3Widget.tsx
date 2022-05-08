import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { Copy } from 'react-feather';
import toast from 'react-hot-toast';
import {
  useAccount,
  useBalance,
  useEnsName,
  useFeeData,
  useSendTransaction,
} from 'wagmi';

import { Button } from './Button';

export function Web3Widget() {
  const { data: accountData } = useAccount();
  const { data: ensName } = useEnsName({ address: accountData?.address });
  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    addressOrName: accountData?.address,
  });
  const { data: feeData, isLoading: feeLoading } = useFeeData({
    formatUnits: 'ether',
  });

  const { isLoading: transactionLoading, sendTransactionAsync } =
    useSendTransaction();

  const sendETH = async () =>
    await sendTransactionAsync({
      request: {
        to: 'timoclasen.eth',
        value: BigNumber.from('1000000000000000'), // 0,001 ETH in WEI
      },
    });

  const copyAddress = (adress: string) => {
    navigator.clipboard.writeText(adress).then(
      () => {
        toast.success('Adresse in Zwischenablage kopiert.');
      },
      () => {
        toast.error('Kopieren fehlgeschlagen.');
      }
    );
  };

  const shortenedAddress = (adress: string) =>
    `${adress.substring(0, 10)}...${adress.substring(adress.length - 10)}`;

  return (
    <div id="web3" className="flex justify-center">
      <div className="w-full max-w-screen-sm rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-12">
        <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">Web3</h2>
        <div className="mb-4">
          <ConnectButton accountStatus="avatar" chainStatus="full" />
        </div>
        {accountData ? (
          <>
            <div className="flex justify-between">
              <p
                className="text-md truncate opacity-60 md:text-lg lg:text-xl"
                title={ensName ? ensName : accountData.address}
              >
                <span className="">{ensName ? 'ENS Name: ' : 'Adresse: '}</span>
                {ensName
                  ? ensName
                  : shortenedAddress(accountData.address || '')}
              </p>
              <button
                className="opacity-60 hover:text-highlight dark:hover:text-highlight-dark"
                onClick={() =>
                  copyAddress(ensName ? ensName : accountData.address || '')
                }
              >
                <Copy size={20} />
                <span className="sr-only">In Zwischenablage kopieren</span>
              </button>
            </div>
            <p
              className="text-md truncate opacity-60 md:text-lg lg:text-xl"
              title={`${balanceData?.formatted} ${balanceData?.symbol}`}
            >
              <span className="">Kontostand: </span>
              {!balanceLoading
                ? `${balanceData?.formatted} ${balanceData?.symbol}`
                : 'Lädt…'}
            </p>
            <p
              className="text-md truncate opacity-60 md:text-lg lg:text-xl"
              title={`${feeData?.formatted?.gasPrice} ETH`}
            >
              <span className="">Gas Preis: </span>
              {!feeLoading ? `${feeData?.formatted?.gasPrice} ETH` : 'Lädt…'}
            </p>
          </>
        ) : (
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
            </a>
            ) und lass dir einige Daten anzeigen.
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col space-y-4">
            {accountData && (
              <Button
                variant="solid"
                size="small"
                onClick={() => sendETH()}
                disabled={transactionLoading}
                title="0.001 ETH senden"
              >
                ☕️ Buy me a coffee
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
