import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const textOptions = {
  NONE: { title: "🔥 Mint to put in the wallet" },
  MINTING: {
    title: "🚀 Minting NFT",
    description: "Start minting NFT!\nThis work still run in the background.",
  },
  MINTED: { title: "💎 Minting NFT Complete!" },
};

function StateText({ state }) {
  let mintStateText = {};
  switch (state) {
    case "NONE":
      mintStateText = textOptions.NONE;
      break;
    case "MINTING":
      mintStateText = textOptions.MINTING;
      break;
    case "MINTED":
      mintStateText = textOptions.MINTED;
      break;
    default:
      mintStateText = "Error!";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mintStateText.title}</Text>
      {mintStateText.description && (
        <Text style={styles.description}>{mintStateText.description}</Text>
      )}
    </View>
  );
}

export default StateText;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: GlobalStyles.fonts.medium,
  },
  description: {
    alignSelf: "center",
    textAlign: "center",
    color: GlobalStyles.colors.gray200,
    fontSize: 14,
    fontFamily: GlobalStyles.fonts.regular,
    marginTop: 8,
  },
});
