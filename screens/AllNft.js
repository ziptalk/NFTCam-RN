import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import IconTextButton from "../components/UI/IconTextButton";
import NftItem from "../components/AllNft/NftItem";
import IconButton from "../components/UI/IconButton";

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

function renderNftItem(itemData) {
  return <NftItem {...itemData.item} />;
}

function AllNft({ route, navigation }) {
  const myPageButtonHandler = () => {
    navigation.navigate("MyPage");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={"person"}
            color={"white"}
            onPress={myPageButtonHandler}
          />
        );
      },
    });
  }, [navigation, myPageButtonHandler]);

  return (
    <View style={styles.root}>
      <FlatList
        data={DUMMY_NFT}
        renderItem={renderNftItem}
        keyExtractor={(item) => item.materialId}
        key={2}
        numColumns={2}
        style={styles.list}
      />
      <IconTextButton style={styles.createButton} icon="add" color={"white"}>
        Create
      </IconTextButton>
    </View>
  );
}

export default AllNft;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  list: {
    paddingTop: 20,
  },
  createButton: {
    position: "absolute",
    bottom: 32,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
