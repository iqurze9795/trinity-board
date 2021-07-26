import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import * as ethcall from "ethcall";
import { ethers } from "ethers";
import { get } from 'lodash'
import { Network } from "../json/network"

interface IWalletProps {
  /* null - address is pending / '' - no wallet connected */
  address: string | null;
  provider: IAppProvider | null;
  setAddress: (address: string) => void;
  connectWallet: () => void;
}
interface IAppProvider {
  web3Provider: any,
  provider: any,
  ethcallProvider: any
}

const infuraId = atob(Network.ETHEREUM_NODE_URL).split('/').pop()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId,
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
        108: 'https://mainnet-rpc.thundercore.com',
        128: "https://http-mainnet.hecochain.com",
        137: "https://rpc-mainnet.matic.network",
        100: "https://rpc.xdaichain.com",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        250: "https://rpcapi.fantom.network",
        1666600000: "https://api.harmony.one",
        1666600001: "https://s1.api.harmony.one",
        1666600002: "https://s2.api.harmony.one",
        1666600003: "https://s3.api.harmony.one",
      }
    }
  },
};

let web3Modal: any;
let walletProvider: any;


const init = async () => {
  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
    // disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
}

const WalletContext = createContext({} as IWalletProps);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<IAppProvider | null>(null);


  useEffect(() => {
    //component did mounted component did updated
    (async () => {
      await init()
      await onConnect()
    })()
    // const address = new URLSearchParams(window.location.search).get("address");
    // if (address) setAddress(address);
    // else setAddress("");
  }, []);
  const initEthers = async () => {
    const App: IAppProvider = {
      web3Provider: null,
      provider: null,
      ethcallProvider: null
    }
    if (walletProvider) {
      App.web3Provider = walletProvider
      App.provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org",
        {
          name: "Binance Smart Chain",
          chainId: 56,
        })
      try {
        // Request account access
        const accounts = await walletProvider.request({ method: 'eth_requestAccounts' })
        setAddress(get(accounts, [0], ''))
        setProvider(App)
      } catch (error) {
        // User denied account access...
        console.error('User denied account access')
      }
    }
    App.ethcallProvider = new ethcall.Provider();
    await App.ethcallProvider.init(App.provider);
  }


  const onConnect = async () => {

    console.log("Opening a dialog", web3Modal);
    try {
      walletProvider = await web3Modal.connect();
      await initEthers();
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }

    // Subscribe to accounts change
    walletProvider.on("accountsChanged", async (info: any) => {
      console.log(info)
      await initEthers();
    });

    // Subscribe to chainId change
    walletProvider.on("chainChanged", async (info: any) => {
      console.log(info)
      await initEthers();
    });

    // Subscribe to networkId change
    walletProvider.on("networkChanged", async (info: any) => {
      console.log(info)
      await initEthers();
    });

  }

  const handleManualAddressProvide = useCallback((address: string) => {
    window.location.href = `?address=${address}`;
  }, []);

  const handleWalletConnect = useCallback(async () => {
    await onConnect()
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        provider,
        setAddress: handleManualAddressProvide,
        connectWallet: handleWalletConnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
