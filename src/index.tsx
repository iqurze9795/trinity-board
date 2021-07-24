import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from "./hooks/useWallet";
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './layout/default'
import "./styles/index.scss";

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
