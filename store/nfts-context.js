import { createContext, useReducer } from "react";

const DUMMY_NFT = [
  {
    materialId: 21,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 20,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 19,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 18,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 17,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 16,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 15,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 14,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 13,
    source: "https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 12,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
  {
    materialId: 11,
    source: "https://www.hanbit.co.kr/data/editor/20191017121027_wgbsqeit.png",
    date: "23.12.27 PM 02:15",
    device: "아이폰x",
    address: "서울특별시 강남구 강남대로84길 8",
    isMinting: "MINTED",
  },
];

export const NftsContext = createContext({
  nfts: [],
  addNft: () => {},
  deleteNft: () => {},
});

function nftReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state;
    case "DELETE":
      return state;
    default:
      return state;
  }
}

function NftsContextProvider({ children }) {
  const [nftState, dispatch] = useReducer(nftReducer, DUMMY_NFT);

  function addNft(nftData) {
    dispatch({ type: "ADD", payload: nftData });
  }

  function deleteNft(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    nfts: nftState,
    addNft: addNft,
    deleteNft: deleteNft,
  };

  return <NftsContext.Provider value={value}>{children}</NftsContext.Provider>;
}

export default NftsContextProvider;
