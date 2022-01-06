import { BigNumber } from 'ethers';
import { Copy, XCircle } from 'react-feather';
import toast from 'react-hot-toast';
import {
  useAccount,
  useBalance,
  useConnect,
  useFeeData,
  useTransaction,
} from 'wagmi';

import { Button } from './Button';
import { useIsMounted } from './useIsMounted';

export function Web3Widget() {
  const isMounted = useIsMounted();
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
  });
  const [{ data: feeData, loading: feeLoading }] = useFeeData({
    formatUnits: 'ether',
  });
  const [{ loading: transactionLoading }, sendTransaction] = useTransaction();

  const sendETH = async () => {
    const { error } = await sendTransaction({
      request: {
        to: 'timoclasen.eth',
        value: BigNumber.from('1000000000000000'), // 0,001 ETH in WEI
      },
    });

    if (error) {
      toast.error('Es ist ein Fehler aufgetreten.');
    }
  };

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
    <div className="flex justify-center">
      <div className="w-full max-w-screen-sm px-6 py-6 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-12">
        <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">Web3</h2>
        {accountData ? (
          <>
            <div className="flex justify-between">
              <p
                className="truncate text-md md:text-lg opacity-60 lg:text-xl"
                title={
                  accountData.ens?.name
                    ? accountData.ens?.name
                    : accountData.address
                }
              >
                <span className="">
                  {accountData.ens?.name ? 'ENS Name: ' : 'Adresse: '}
                </span>
                {accountData.ens?.name
                  ? accountData.ens?.name
                  : shortenedAddress(accountData.address)}
              </p>
              <button
                className="opacity-60 hover:text-highlight dark:hover:text-highlight-dark"
                onClick={() =>
                  copyAddress(
                    accountData.ens?.name
                      ? accountData.ens?.name
                      : accountData.address
                  )
                }
              >
                <Copy size={20} />
                <span className="sr-only">In Zwischenablage kopieren</span>
              </button>
            </div>
            <p
              className="truncate text-md md:text-lg opacity-60 lg:text-xl"
              title={`${balanceData?.formatted} ${balanceData?.symbol}`}
            >
              <span className="">Kontostand: </span>
              {!balanceLoading
                ? `${balanceData?.formatted} ${balanceData?.symbol}`
                : 'Lädt…'}
            </p>
            <p
              className="truncate text-md md:text-lg opacity-60 lg:text-xl"
              title={`${feeData?.formatted?.gasPrice} ETH`}
            >
              <span className="">Gas Preis: </span>
              {!feeLoading ? `${feeData?.formatted?.gasPrice} ETH` : 'Lädt…'}
            </p>
          </>
        ) : (
          <p className="opacity-60 text-md md:text-lg lg:text-xl">
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
        <div className="flex justify-center mt-8">
          <div className="flex flex-col space-y-4">
            {accountData ? (
              <>
                <Button variant="ghost" size="small" onClick={disconnect}>
                  <XCircle />
                  Wallet trennen
                </Button>
                <Button
                  variant="solid"
                  size="small"
                  onClick={() => sendETH()}
                  disabled={transactionLoading}
                  title="0.001 ETH senden"
                >
                  ☕️ Buy me a coffee
                </Button>
              </>
            ) : (
              connectData.connectors.map((connector) => (
                <Button
                  variant="ghost"
                  size="small"
                  disabled={isMounted ? !connector.ready : false}
                  key={connector.id}
                  onClick={() => connect(connector)}
                >
                  {isMounted
                    ? connector.name === 'Injected'
                      ? 'Injected (z.B. MetaMask)'
                      : connector.name
                    : connector.id === 'injected'
                    ? connector.id
                    : connector.name}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
