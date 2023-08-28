import { Image, StyleSheet, View } from "react-native";
import PolygonLogo from "../../assets/icons/polygon.svg";

function MintingIcon({ style }) {
  return (
    <View style={[styles.container, style]}>
      <PolygonLogo width={20} height={20} />
    </View>
  );
}

export default MintingIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000060",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 8,
  },
});
