import { createContext, useReducer, useState } from "react";

export const NftsContext = createContext({
  nfts: [],
  selectedNft: null,
  setSelection: () => {},
  setNfts: () => {},
  addNft: () => {},
  deleteNft: () => {},
});

function nftReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state;
    default:
      return state;
  }
}

function NftsContextProvider({ children }) {
  const [nftState, dispatch] = useReducer(nftReducer);
  const [selectedNft, setSelectedNft] = useState();

  function setSelection(materialId) {
    setSelectedNft(nftState.find((nft) => nft.materialId === materialId));
  }

  function setNfts(nfts) {
    dispatch({ type: "SET", payload: nfts });
  }

  function addNft(nftData) {
    dispatch({ type: "ADD", payload: nftData });
  }

  function deleteNft(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    nfts: nftState,
    selectedNft: selectedNft,
    setSelection: setSelection,
    setNfts: setNfts,
    addNft: addNft,
    deleteNft: deleteNft,
  };

  return <NftsContext.Provider value={value}>{children}</NftsContext.Provider>;
}

export default NftsContextProvider;
