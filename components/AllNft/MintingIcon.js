import { Image, StyleSheet, View } from "react-native";

function MintingIcon() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../../assets/icons/polygon.svg")}
      />
    </View>
  );
}

export default MintingIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000007",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    margin: 8,
  },
});
