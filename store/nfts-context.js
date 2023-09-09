import { createContext, useReducer } from "react";

export const NftsContext = createContext({
  nfts: [],
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
    setNfts: setNfts,
    addNft: addNft,
    deleteNft: deleteNft,
  };

  return <NftsContext.Provider value={value}>{children}</NftsContext.Provider>;
}

export default NftsContextProvider;
