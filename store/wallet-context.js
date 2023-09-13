import { createContext, useReducer, useState } from "react";

import EthereumLogo from "../assets/icons/ethereum.svg";
import PolygonLogo from "../assets/icons/polygon.svg";

export const NETWORKS = [
  {
    displayName: "Ethereum Sepolia Testnet",
    gasFee: 200,
    identifier: "SEPOLIA",
    icon: EthereumLogo,
  },
  {
    displayName: "Polygon Mumbai Testnet",
    gasFee: 200,
    identifier: "MUMBAI",
    icon: PolygonLogo,
  },
];

export const WalletContext = createContext({
  wallets: [],
  setWallet: () => {},
  addWallet: () => {},
  deleteWallet: () => {},
  selectedWallet: null,
  selectedNetwork: null,
  selectNetwork: (id) => {},
});

function walletReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "DEL":
      return state;
    default:
      return state;
  }
}

function WalletContextProvider({ children }) {
  const [walletState, dispatch] = useReducer(walletReducer, [
    { walletName: "", walletAddress: "" },
  ]);

  function setWallet(wallets) {
    dispatch({ type: "SET", payload: wallets });
  }

  function addWallet(wallet) {
    dispatch({ type: "ADD", payload: wallet });
  }

  function deleteWallet(wallet) {
    dispatch({ type: "DEL", payload: wallet });
  }

  const [selectedWallet, setSelectedWallet] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState([
    { walletName: "", walletAddress: "" },
  ]);

  function selectNetwork(id) {
    setSelectedNetwork(NETWORKS.filter((network) => network.identifier === id));
  }

  const value = {
    wallets: walletState,
    setWallet: setWallet,
    addWallet: addWallet,
    deleteWallet: deleteWallet,
    selectedWallet: selectedWallet,
    selectedNetwork: selectedNetwork,
    selectNetwork: selectNetwork,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export default WalletContextProvider;
