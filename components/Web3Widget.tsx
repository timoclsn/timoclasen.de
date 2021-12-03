import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from './Button';

const injected = new InjectedConnector({ supportedChainIds: [1, 5] });

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = useState<number | null>();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  return (
    <p className="opacity-60 text-md md:text-lg lg:text-xl">
      {balance
        ? `Kontostand: ${
            Math.round((formatEther(balance) as any) * 1e4) / 1e4
          } ETH`
        : 'Kontostand: Lädt…'}
    </p>
  );
}

function EnsName() {
  const { account, library, chainId } = useWeb3React();
  const [ensName, setEnsName] = useState<string | null>();
  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .lookupAddress(account)
        .then((account: any) => {
          if (!stale) {
            setEnsName(account);
          }
        })
        .catch(() => {
          if (!stale) {
            setEnsName(null);
          }
        });

      return () => {
        stale = true;
        setEnsName(undefined);
      };
    }
  }, [account, library, chainId]);

  const shortenedAddress = (account: any) => {
    if (!account) {
      return 'Adresse: Lädt…';
    }

    return `Adresse: ${account.substring(0, 6)}...${account.substring(
      account.length - 6
    )}`;
  };

  return (
    <p className="opacity-60 text-md md:text-lg lg:text-xl">
      {ensName ? `ENS Name: ${ensName}` : shortenedAddress(account)}
    </p>
  );
}

export function Web3Widget() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3WidgetContent />
    </Web3ReactProvider>
  );
}

function Web3WidgetContent() {
  const { activate, deactivate, active, account } = useWeb3React();

  const onConnect = async () => {
    await activate(injected, (error) => {
      toast.error(
        'Verbinden fehlgeschlagen. Hast du ein Ethereum Wallet installiert und entsperrt?'
      );
      console.error(error.message);
    });
    splitbee.track('Wallet Connected');
  };

  const onDisconnect = () => {
    deactivate();
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-sm px-6 py-6 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-12">
        <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">Web3</h2>
        {account ? (
          <>
            <EnsName />
            <Balance />
          </>
        ) : (
          <p className="opacity-60 text-md md:text-lg lg:text-xl">
            Mein Crypto Spielplatz. Verbinde dein Ethereum Wallet und lass dir
            einige Daten anzeigen.
          </p>
        )}
        <div className="flex justify-center mt-4">
          {active ? (
            <Button variant="ghost" size="small" onClick={onDisconnect}>
              🤑 Wallet trennen
            </Button>
          ) : (
            <Button variant="ghost" size="small" onClick={onConnect}>
              🤑 Wallet verbinden
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
