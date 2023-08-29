import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function IconTextButton({ children, icon, color, style }) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.button, style]}>
        <Ionicons name={icon} size={22} color={color} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default IconTextButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: 15,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.primary,
    flexDirection: "row",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.bold,
    marginHorizontal: 6,
    color: "white",
  },
});
