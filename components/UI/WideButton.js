import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function WideButton({ children, style }) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={[styles.button, style]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default WideButton;

const styles = StyleSheet.create({
  button: {
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
