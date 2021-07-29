import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import * as ethcall from "ethcall";
import { ethers } from "ethers";
import { get } from 'lodash'

interface IWalletProps {
  walletProvider: any | null;
  address: string | null,
  connectWallet: () => void;
}
interface IAppProvider {
  web3Provider: any,
  provider: any,
  ethcallProvider: any
}



const WalletContext = createContext({} as IWalletProps);
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletProvider, setWalletProvider] = useState<any | null>(null);
  const [address, setAddress] = useState<any | null>(null)
  const web3Modal = (window as any).web3Modal

  useEffect(() => {
    //component did mounted component did updated
    (async () => {
      await connectWallet()
    })()
  }, [setWalletProvider]);

  const onInitAccountInfo = async (provider: any) => {
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    setAddress(accounts[0])
  }

  const subscribeProvider = async (provider: any) => {
    // Subscribe to accounts change
    provider.on("accountsChanged", async (info: any) => {
      console.log(info)
      await onInitAccountInfo(provider)
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (info: any) => {
      console.log(info)
      await onInitAccountInfo(provider)
    });

    // Subscribe to networkId change
    provider.on("networkChanged", async (info: any) => {
      console.log(info)
      await onInitAccountInfo(provider)
    });
  }

  const connectWallet = async () => {
    try {
      const result = await web3Modal.connect()
      await subscribeProvider(result)
      await onInitAccountInfo(result)
      setWalletProvider(result)
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  }
  return (
    <WalletContext.Provider
      value={{
        address,
        walletProvider,
        connectWallet: connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
