import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import IconTextButton from "../components/UI/IconTextButton";
import NftItem from "../components/AllNft/NftItem";
import IconButton from "../components/UI/IconButton";
import { NftsContext } from "../store/nfts-context";
import { fetchMaterials } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function renderNftItem(itemData) {
  return <NftItem {...itemData.item} />;
}

function AllNft({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);

  const nftsCtx = useContext(NftsContext);

  useEffect(() => {
    getMaterials();
  }, []);

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

  async function getMaterials() {
    setIsFetching(true);
    try {
      const materials = await fetchMaterials();
      nftsCtx.setNfts(materials);
    } catch (error) {
      console.log("Error! ", error);
    }
    setIsFetching(false);
  }

  const myPageButtonHandler = () => {
    navigation.navigate("MyPage");
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={nftsCtx.nfts}
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
