import React from "react";
import ModalAccount from "./ModalAccount";
import { Wallet } from "./Wallet";

export default function Home() {
  return (
    <div>
      <img
        src={"/playing-cards.jpg"}
        width="100%"
        height="100%"
        style={{ zIndex: -1, position: "absolute" }}
      ></img>
      <ModalAccount />
      <Wallet />
    </div>
  );
}
