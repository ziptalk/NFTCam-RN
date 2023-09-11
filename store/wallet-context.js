import { createContext, useReducer, useState } from "react";

export const WalletContext = createContext({
  wallets: [],
  selectedWallet: null,
  setWallet: () => {},
  addWallet: () => {},
  deleteWallet: () => {},
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
  const [walletState, dispatch] = useReducer(walletReducer);

  const [selectedWallet, setSelectedWallet] = useState();

  function setSelection(walletId) {
    // setSelectedWallet()
  }

  function setWallet(wallets) {
    dispatch({ type: "SET", payload: wallets });
  }

  function addWallet(wallet) {
    dispatch({ type: "ADD", payload: wallet });
  }

  function deleteWallet(wallet) {
    dispatch({ type: "DEL", payload: wallet });
  }

  const value = {
    wallets: walletState,
    selectedWallet: selectedWallet,
    setSelection: setSelection,
    setWallet: setWallet,
    addWallet: addWallet,
    deleteWallet: deleteWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export default WalletContextProvider;
