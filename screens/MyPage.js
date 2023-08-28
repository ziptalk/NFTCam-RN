import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SmallIndex from "../components/UI/SmallIndex";
import { GlobalStyles } from "../constants/styles";

function MyPage({ route, navigation }) {
  const chargeButtonHandler = () => {
    navigation.navigate("ChargePoint");
  };
  const connectWalletHandler = () => {};

  return (
    <View style={styles.root}>
      <SmallIndex>CURRENT POINT</SmallIndex>
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>5,432 P</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={chargeButtonHandler}>
          <View style={styles.chargeButton}>
            <Text style={styles.chargeButtonText}>CHARGE +</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.walletsLabel}>Wallets</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={connectWalletHandler}>
        <View style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect Rally Protocol</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
  },
  pointContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointText: {
    color: "white",
    fontSize: 32,
    fontFamily: GlobalStyles.fonts.bold,
  },
  chargeButton: {
    backgroundColor: GlobalStyles.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 25,
  },
  chargeButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: GlobalStyles.fonts.semibold,
  },
  walletsLabel: {
    fontFamily: GlobalStyles.fonts.bold,
    fontSize: 20,
    color: "white",
    marginTop: 30,
    marginBottom: 16,
  },
  connectButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: GlobalStyles.colors.gray700,
  },
  connectButtonText: {
    color: "white",
    fontSize: 16,
  },
});
