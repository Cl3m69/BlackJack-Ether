import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import useSWR, { mutate } from "swr";
import { formatEther } from "@ethersproject/units";
import Home from "./Components/Home";
import { Wallet } from "./Components/Wallet";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home></Home>
    </Web3ReactProvider>
  );
};

export default App;
