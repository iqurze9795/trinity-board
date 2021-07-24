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
import Web3 from "web3";
import { get } from 'lodash'
import { Network } from "../json/network"

interface IWalletProps {
  /* null - address is pending / '' - no wallet connected */
  address: string | null;
  setAddress: (address: string) => void;
  connectWallet: () => void;
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
let provider: any;


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

  const fetchAccountData = async () => {
    console.log("provider::", provider)
    if (provider) {
      const web3 = new Web3(provider);
      const address = await web3.eth.getAccounts();
      setAddress(get(address, [0], ''))
    }
  }

  const onConnect = async () => {

    console.log("Opening a dialog", web3Modal);
    try {
      provider = await web3Modal.connect();
      await fetchAccountData();
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }

    // Subscribe to accounts change
    provider.on("accountsChanged", async (info: any) => {
      console.log(info)
      await fetchAccountData();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (info: any) => {
      console.log(info)
      await fetchAccountData();
    });

    // Subscribe to networkId change
    provider.on("networkChanged", async (info: any) => {
      console.log(info)
      await fetchAccountData();
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
        setAddress: handleManualAddressProvide,
        connectWallet: handleWalletConnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
