import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletProvider } from "./hooks/useWallet";
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './layout/default'
import { Network } from "./json/network"
import "./styles/index.scss";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: atob(Network.ETHEREUM_NODE_URL).split('/').pop(),
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


(window as any).web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});


ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
