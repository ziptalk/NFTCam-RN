import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import SmallIndex from "../components/UI/SmallIndex";
import { GlobalStyles } from "../constants/styles";
import WideButton from "../components/UI/WideButton";

function ChargePoint({ route, navigation }) {
  const [chargeValue, setChargeValue] = useState("");

  function inputChagneHandler(enteredValue) {
    setChargeValue(enteredValue);
  }

  function chargeButtonHandler() {}

  return (
    <View style={styles.root}>
      <SmallIndex>CURRENT POINT</SmallIndex>
      <Text style={styles.currentPoint}>5,432 P</Text>
      <SmallIndex>POINTS TO CHARGE</SmallIndex>
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.textInput, styles.chargePoint]}
          maxLength={10}
          keyboardType="number-pad"
          autoFocus={true}
          value={chargeValue}
          onChangeText={inputChagneHandler}
        />
        <Text style={styles.chargePoint}>P</Text>
      </View>
      <WideButton onPress={chargeButtonHandler} style={styles.chargeButton}>
        Charge Point
      </WideButton>
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
  textInputContainer: {
    flexDirection: "row",
  },
  chargePoint: {
    fontSize: 32,
    fontFamily: GlobalStyles.fonts.bold,
    color: "white",
  },
  textInput: {
    marginRight: 4,
  },
  chargeButton: {
    marginTop: 18,
    paddingHorizontal: 4,
  },
});
