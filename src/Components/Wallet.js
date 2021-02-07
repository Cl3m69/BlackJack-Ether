import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import useSWR, { mutate } from "swr";
import { Button } from "@material-ui/core";
import { useStateValue } from "../context/StateProvider";

import "./Wallet.css";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

const fetcher = (library) => (...args) => {
  const [method, ...params] = args;
  console.log(method, params);
  return library[method](...params);
};

export const Balance = () => {
  const { account, library } = useWeb3React();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  const [{ global }, dsp] = useStateValue();

  useEffect(() => {
    dsp({
      type: "SET_BALANCE",
      balance: balance,
    });
  }, [balance]);

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    library.on("block", () => {
      console.log("update balance...");
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners("block");
    };
    // trigger the effect only on component mount
  }, []);
  return <div></div>;
};

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();
  const { data: balance } = useSWR(["getBalance", account, "latest"]);

  const [{ global }, dsp] = useStateValue();

  useEffect(() => {
    dsp({
      type: "SET_META_INFO",
      accountId: account,
      chainId: chainId,
    });
  }, [chainId]);

  useEffect(() => {
    dsp({
      type: "SET_META_INFO",
      accountId: account,
      chainId: chainId,
    });
  }, [account]);

  const onClick = () => {
    activate(injectedConnector);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {active ? (
        <>
          <Balance></Balance>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button class="connect-button" type="button" onClick={onClick}>
            Connect to Metamask
          </Button>
        </div>
      )}
    </div>
  );
};
