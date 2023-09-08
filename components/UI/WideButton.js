import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function WideButton({ children, style, onPress }) {
  return (
    <View style={[style, styles.buttonContainer]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.button]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default WideButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  button: {
    // marginHorizontal: 15,
    padding: 14,
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontFamily: GlobalStyles.fonts.semibold,
    color: "white",
  },
});
