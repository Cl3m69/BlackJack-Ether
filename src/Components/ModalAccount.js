import React from "react";
import { useStateValue } from "../context/StateProvider";
import { formatEther } from "@ethersproject/units";
import "./ModalAccount.css";

export default function ModalAccount() {
  const [{ global }, dsp] = useStateValue();
  return (
    <div className="marquee-rtl">
      <span
        className="defile"
        data-text={`        Balance:${" "}
      ${
        global.balance
          ? parseFloat(formatEther(global.balance)).toPrecision(4) + "ETH"
          : "Not connected"
      }
             Chain ID :${" "}
      ${global.chainId ? global.chainId : "Not connected"}
             Account ID :${" "}
      ${global.accountId ? global.accountId : "Not connected"}
`}
      >
        Balance:{" "}
        {global.balance
          ? parseFloat(formatEther(global.balance)).toPrecision(4) + "ETH"
          : "Not connected"}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chain ID :{" "}
        {global.chainId ? global.chainId : "Not connected"}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Account ID :{" "}
        {global.accountId ? global.accountId : "Not connected"}
      </span>
    </div>
  );
}
