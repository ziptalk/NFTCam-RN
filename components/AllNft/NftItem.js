import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import MintingIcon from "./MintingIcon";

function NftItem({ source, isMinting, materialId }) {
  const navigation = useNavigation();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  function itemPressHandler() {
    navigation.navigate("NftDetail", {
      materialId: materialId,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={itemPressHandler}>
        <Image
          style={styles.image}
          source={{ uri: source }}
          placeholder={blurhash}
        />
        {(isMinting === "MINTED" || isMinting === "MINTING") && (
          <MintingIcon style={styles.mintingIcon} />
        )}
      </TouchableOpacity>
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
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
