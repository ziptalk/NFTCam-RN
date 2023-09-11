import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function CircleIconButton({
  icon,
  onPress,
  backgroundColor,
  iconColor,
  style,
}) {
  const buttonStyles = [styles.button];
  if (style) {
    buttonStyles.push(style);
  }
  if (backgroundColor) {
    buttonStyles.push({
      backgroundColor: backgroundColor,
    });
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={iconColor ? iconColor : "white"} />
    </TouchableOpacity>
  );
}

export default CircleIconButton;

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 3,
    // shadowColor: GlobalStyles.colors.gray900,
    // shadowRadius: 3,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.3,
  },
});
