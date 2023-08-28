import { StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function SmallIndex({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

export default SmallIndex;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: GlobalStyles.colors.gray400,
    marginBottom: 4,
  },
});
