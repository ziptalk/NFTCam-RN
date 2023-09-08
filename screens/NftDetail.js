import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CircleIconButton from "../components/UI/CircleIconButton";
import { GlobalStyles } from "../constants/styles";
import WideButton from "../components/UI/WideButton";
import InfoText from "../components/NftDetail/InfoText";

function NftDetail({ isMinting }) {
function NftDetail({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);

  const nftsCtx = useContext(NftsContext);

  const insets = useSafeAreaInsets();
  const materialId = route.params.materialId;
  let selectedMaterial = nftsCtx.nfts.find(
    (nft) => nft.materialId === materialId
  );

  useEffect(() => {}, []);

  async function getMaterial() {
    setIsFetching(true);
    try {
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <AutoHeightImage
          source={{ uri: selectedMaterial.source }}
          width={Dimensions.get("window").width}
          style={[styles.image, { marginTop: insets.top }]}
        />
        <View style={[styles.buttonContainer, { top: insets.top }]}>
          <CircleIconButton icon={"arrow-back"} backgroundColor={"#00000047"} />
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
        <Text style={styles.stateText}>🔥 Mint to put in the wallet</Text>
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
      {selectedMaterial.isMinting === "NONE" ? (
        <WideButton style={styles.mintingButton}>Minting</WideButton>
      ) : null}
    </View>
  );
}

export default NftDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 30,
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
