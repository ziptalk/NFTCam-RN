import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Ionicons name={icon} size={24} color={"white"} />
    </TouchableOpacity>
  );
}

export default IconButton;

const styles = StyleSheet.create({});
