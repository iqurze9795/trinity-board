import { useEffect, useState } from 'react'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Network } from "../json/network"
export const useProvider = () => {
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
  const [web3Modal, setWeb3Modal] = useState<any | null>(null)
  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    console.log("use provider::", web3Modal)
    setWeb3Modal(web3Modal)
  }, [setWeb3Modal])

  return web3Modal
}
