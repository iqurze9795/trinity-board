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
  address: string | null;
  provider: IAppProvider | null;
  connectWallet: () => void;
}
interface IAppProvider {
  web3Provider: any,
  provider: any,
  ethcallProvider: any
}



const WalletContext = createContext({} as IWalletProps);
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const web3Modal = (window as any).web3Modal

  useEffect(() => {
    //component did mounted component did updated
    (async () => {
      await connectWallet()
    })()
  }, []);

  const changeWallet = async function () {
    let cached = web3Modal.cachedProvider
    web3Modal.clearCachedProvider()
    await connectWallet()
    if (!web3Modal.cachedProvider) {
      web3Modal.setCachedProvider(cached)
    }
  }

  const subscribeProvider = async (provider: any) => {
    // Subscribe to accounts change
    provider.on("accountsChanged", async (info: any) => {
      console.log(info)
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (info: any) => {
      console.log(info)
    });

    // Subscribe to networkId change
    provider.on("networkChanged", async (info: any) => {
      console.log(info)
    });
  }


  const connectWallet = async () => {

    try {
      const walletProvider = await web3Modal.connect()
      console.log(walletProvider)
      await subscribeProvider(walletProvider)
      setProvider(await new ethers.providers.Web3Provider(walletProvider))
      console.log("provider", provider)
      // let connectedNetwork = await provider.getNetwork()
      // console.log("network::", connectedNetwork)

    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  }
  return (
    <WalletContext.Provider
      value={{
        address,
        provider,
        connectWallet: connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
