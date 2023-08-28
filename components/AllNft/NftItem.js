import { StyleSheet, View, ImageBackground, Text } from "react-native";
import MintingIcon from "./MintingIcon";

function NftItem({ source, isMinted }) {
  return (
    <View>
      <ImageBackground
        style={styles.image}
        source={{ uri: source }}
        resizeMode="cover"
      >
        {isMinted === "MINTED" && <MintingIcon style={styles.mintingIcon} />}
      </ImageBackground>
    </View>
  );
}

export default NftItem;

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 210,
    borderRadius: 10,
    overflow: "hidden",
  },
  mintingIcon: {
    margin: 10,
  },
});
