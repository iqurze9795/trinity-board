import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ethers } from "ethers";


interface IWalletProps {
  web3Provider: any | null,
  address: string | null,
  networkInfo: any | null,
  connectWallet: () => void;
}


const WalletContext = createContext({} as IWalletProps);
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [web3Provider, setWeb3Provider] = useState<any | null>(null);
  const [address, setAddress] = useState<any | null>(null)
  const [networkInfo, setNetworkInfo] = useState<any | null>(null)
  const web3Modal = (window as any).web3Modal

  useEffect(() => {
    //component did mounted component did updated
    (async () => {
      await connectWallet()
    })()
  }, []);

  const onInitAccountInfo = async (provider: any) => {
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const accounts = await web3Provider.listAccounts()
    const network = await web3Provider.getNetwork()
    setAddress(accounts[0])
    setNetworkInfo(network)
    setWeb3Provider(web3Provider)
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
      await onInitAccountInfo(provider)
    });
  }

  const connectWallet = async () => {
    try {
      const result = await web3Modal.connect()
      await subscribeProvider(result)
      await onInitAccountInfo(result)
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  }
  return (
    <WalletContext.Provider
      value={{
        address,
        networkInfo,
        web3Provider,
        connectWallet: connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
