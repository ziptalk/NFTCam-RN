import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CircleIconButton from "../components/UI/CircleIconButton";
import { GlobalStyles } from "../constants/styles";
import WideButton from "../components/UI/WideButton";
import InfoText from "../components/NftDetail/InfoText";

function NftDetail({ isMinting }) {
  const [isFetching, setIsFetching] = useState(true);
  const insets = useSafeAreaInsets();

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
          source={{
            uri: "https://images.unsplash.com/photo-1692071097529-320eb2b32292?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&w=1000&q=80",
          }}
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
          <InfoText
            type={"Date and Time"}
            content={"14-March-2023  03:12 AM"}
          />
          <InfoText type={"Device"} content={"iPhone XS"} />
          <InfoText
            type={"Location"}
            content={"Gangnam-daero, Gangnam-gu, Seoul"}
            style={styles.lastInfoText}
          />
        </View>
      </ScrollView>
      <WideButton style={styles.mintingButton}>Minting</WideButton>
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
