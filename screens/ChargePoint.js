import { StyleSheet, Text, View } from "react-native";

import SmallIndex from "../components/UI/SmallIndex";
import { GlobalStyles } from "../constants/styles";
import WideButton from "../components/UI/WideButton";

function ChargePoint({ route, navigation }) {
  return (
    <View style={styles.root}>
      <SmallIndex>CURRENT POINT</SmallIndex>
      <Text style={styles.currentPoint}>5,432 P</Text>
      <SmallIndex>POINTS TO CHARGE</SmallIndex>
      <Text style={styles.chargePoint}>100 P</Text>
      <WideButton style={styles.chargeButton}>Charge Point</WideButton>
    </View>
  );
}

export default ChargePoint;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
  },
  currentPoint: {
    fontSize: 20,
    fontFamily: GlobalStyles.fonts.bold,
    color: GlobalStyles.colors.gray200,
    marginBottom: 30,
  },
  chargePoint: {
    fontSize: 32,
    fontFamily: GlobalStyles.fonts.bold,
    color: "white",
  },
  chargeButton: {
    marginTop: 18,
  },
});
