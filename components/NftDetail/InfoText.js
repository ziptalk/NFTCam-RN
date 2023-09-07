import { View, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function InfoText({ type, content, style }) {
  return (
    <View style={[styles.textContainer, style]}>
      <Text style={styles.typeText}>{type}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
}

export default InfoText;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 20,
  },
  typeText: {
    fontFamily: GlobalStyles.fonts.medium,
    color: GlobalStyles.colors.gray200,
  },
  contentText: {
    marginTop: 3,
    fontFamily: GlobalStyles.fonts.medium,
    color: "white",
  },
});
