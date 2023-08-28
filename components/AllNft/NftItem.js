import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import MintingIcon from "./MintingIcon";

function NftItem({ source, isMinting }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: source }}
        resizeMode="cover"
      >
        {isMinting === "MINTED" && <MintingIcon style={styles.mintingIcon} />}
      </ImageBackground>
    </View>
  );
}

export default NftItem;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    width: (Dimensions.get("window").width - 50) / 2,
    height: 210,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mintingIcon: {
    margin: 10,
  },
});
