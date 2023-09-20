import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { atom, useRecoilState } from "recoil";

import CircleIconButton from "../components/UI/CircleIconButton";
import { GlobalStyles } from "../constants/styles";
import WideButton from "../components/UI/WideButton";
import InfoText from "../components/NftDetail/InfoText";
import { fetchMaterial } from "../util/http";
import { NftsContext } from "../store/nfts-context";
import StateText from "../components/NftDetail/StateText";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import AutoSizedImage from "../components/UI/AutoSizedImage";
import { mintState } from "../util/state";

function NftDetail({ route, navigation }) {
  const nftsCtx = useContext(NftsContext);
  const materialId = route.params.materialId;
  const contextMaterial = nftsCtx.nfts.find(
    (nft) => nft.materialId === materialId
  );

  // TODO: selected material context로 만들어서 민팅화면, 홈화면에서 mintState 접근할 수 있게 해주기
  const [isMinting, setIsMinting] = useRecoilState(mintState);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState(contextMaterial);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log("nftCtx: ", nftsCtx.nfts);
    getMaterial();
  }, []);

  async function getMaterial() {
    setIsFetching(true);
    try {
      const fetchedMaterial = await fetchMaterial(materialId);
      setSelectedMaterial(fetchedMaterial);
      setIsMinting(fetchedMaterial.isMinting);
      console.log("fetched selected material", selectedMaterial);
    } catch (error) {
      console.log("Error! ", error.response);
    }
    setIsFetching(false);
  }

  function backButtonHandler() {
    navigation.goBack();
  }

  function mintingButtonHandler() {
    navigation.navigate("MintingNft", {
      materialId: materialId,
    });
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageOuterView}>
          <AutoSizedImage
            source={{ uri: selectedMaterial.source }}
            width={Dimensions.get("window").width}
            style={[styles.image, { marginTop: insets.top }]}
          />
          {isMinting === "MINTING" && (
            <View style={styles.imageInnerView}></View>
          )}
        </View>
        <View style={[styles.buttonContainer, { top: insets.top }]}>
          <CircleIconButton
            icon={"arrow-back"}
            backgroundColor={"#00000047"}
            onPress={backButtonHandler}
          />
          <View style={styles.towButtonContainer}>
            <CircleIconButton
              icon={"share-outline"}
              backgroundColor={"#00000047"}
              style={styles.shareButton}
            />
            <CircleIconButton
              icon={"ellipsis-horizontal"}
              backgroundColor={"#00000047"}
            />
          </View>
        </View>
        <StateText state={isMinting} />
        <View style={styles.infoContainer}>
          <InfoText type={"Date and Time"} content={selectedMaterial.date} />
          <InfoText type={"Device"} content={selectedMaterial.device} />
          <InfoText
            type={"Location"}
            content={selectedMaterial.address}
            style={styles.lastInfoText}
          />
        </View>
      </ScrollView>
      {isMinting === "NONE" ? (
        <WideButton onPress={mintingButtonHandler} style={styles.mintingButton}>
          Minting
        </WideButton>
      ) : null}
    </View>
  );
}

export default NftDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageOuterView: {
    overflow: "hidden",
  },
  image: {
    borderRadius: 30,
  },
  imageInnerView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#00000094",
  },
  buttonContainer: {
    position: "absolute",
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  towButtonContainer: {
    flexDirection: "row",
  },
  shareButton: {
    marginRight: 8,
  },
  mintingButton: {
    position: "absolute",
    bottom: 32,
    paddingHorizontal: 15,
  },
  stateText: {
    marginVertical: 20,
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.medium,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: GlobalStyles.colors.gray800,
    borderRadius: 30,
    marginBottom: 100,
  },
  lastInfoText: {
    marginBottom: 20,
  },
});
