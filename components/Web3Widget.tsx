import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Copy } from 'react-feather';
import toast from 'react-hot-toast';

import { Button } from './Button';

const injected = new InjectedConnector({ supportedChainIds: [1, 5] });

export function Web3Widget() {
  const { activate, deactivate, active, account, library, chainId } =
    useWeb3React();

  const signer = library?.getSigner();

  const [balance, setBalance] = useState<number | null>();
  const [ensName, setEnsName] = useState<string | null>();
  const [gasPrice, setGasPrice] = useState<string | null>();

  useEffect(() => {
    if (account && library) {
      library
        .getBalance(account)
        .then((balance: any) => {
          setBalance(balance);
        })
        .catch(() => {
          setBalance(null);
        });

      library
        .lookupAddress(account)
        .then((account: any) => {
          setEnsName(account);
        })
        .catch(() => {
          setEnsName(null);
        });

      library
        .getGasPrice()
        .then((gasPrice: any) => {
          setGasPrice(gasPrice);
        })
        .catch(() => {
          setGasPrice(null);
        });
    }

    return () => {
      setBalance(undefined);
      setEnsName(undefined);
      setEnsName(undefined);
    };
  }, [account, library, chainId]);

  const onConnect = async () => {
    await activate(injected, (error) => {
      toast.error(
        'Verbinden fehlgeschlagen. Hast du ein Ethereum Wallet installiert und entsperrt?'
      );
      console.error(error.message);
    });
    toast.success('Wallet-Verbindung erfolgreich hergestellt.');
    splitbee.track('Wallet Connected');
  };

  const onDisconnect = () => {
    deactivate();
    toast.success('Wallet-Verbindung erfolgreich getrennt.');
  };

  const sendETH = (amount: number) => {
    if (
      balance &&
      gasPrice &&
      ethers.utils.formatEther(balance) >
        ethers.utils.formatEther(gasPrice) + amount
    ) {
      signer
        .sendTransaction({
          to: 'timoclasen.eth',
          value: ethers.utils.parseEther(amount.toString()),
        })
        .then((transaction: any) => {
          toast.success('Erfolgreich gesendet – Dankeschön!');
          console.dir(transaction);
        });
    } else {
      toast.error('Leider nicht genügend ETH im Wallet.');
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText((ensName ? ensName : account) || '').then(
      () => {
        toast.success('Adresse in Zwischenablage kopiert.');
      },
      () => {
        toast.error('Kopieren fehlgeschlagen.');
      }
    );
  };

  const shortenedAddress = (account: any) =>
    account
      ? `${account.substring(0, 10)}...${account.substring(
          account.length - 10
        )}`
      : 'Lädt…';

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-sm px-6 py-6 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-12">
        <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">Web3</h2>
        {account ? (
          <>
            <div className="flex justify-between">
              <p
                className="truncate text-md md:text-lg opacity-60 lg:text-xl"
                title={ensName ? ensName : account}
              >
                <span className="">{ensName ? 'ENS Name: ' : 'Adresse: '}</span>
                {ensName ? ensName : shortenedAddress(account)}
              </p>
              <button
                className="opacity-60 hover:text-highlight dark:hover:text-highlight-dark"
                onClick={() => copyAddress()}
              >
                <Copy size={20} />
                <span className="sr-only">In Zwischenablage kopieren</span>
              </button>
            </div>
            <p
              className="truncate text-md md:text-lg opacity-60 lg:text-xl"
              title={balance ? `${ethers.utils.formatEther(balance)} ETH` : ''}
            >
              <span className="">Kontostand: </span>
              {balance
                ? `${
                    Math.round(
                      (ethers.utils.formatEther(balance) as any) * 1e4
                    ) / 1e4
                  } ETH`
                : 'Lädt…'}
            </p>
            <p
              className="truncate text-md md:text-lg opacity-60 lg:text-xl"
              title={
                gasPrice ? `${ethers.utils.formatEther(gasPrice)} ETH` : ''
              }
            >
              <span className="">Gas Preis: </span>
              {gasPrice ? `${ethers.utils.formatEther(gasPrice)} ETH` : 'Lädt…'}
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
          {active ? (
            <div className="flex flex-col space-y-4">
              <Button variant="ghost" size="small" onClick={onDisconnect}>
                ❌ Wallet trennen
              </Button>
              <Button
                variant="solid"
                size="small"
                onClick={() => sendETH(0.0005)}
              >
                💸 Sende mir 0,0005 ETH
              </Button>
            </div>
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
