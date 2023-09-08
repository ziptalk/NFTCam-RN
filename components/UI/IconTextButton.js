import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function IconTextButton({ children, icon, color, style, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray900,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  text: {
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.semibold,
    marginHorizontal: 6,
    color: "white",
  },
});
