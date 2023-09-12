import { StyleSheet, View, Text } from "react-native";

function WalletItem() {
  return (
    <View>
      <Text>Wallet Name</Text>
      <Text>Wallet Address</Text>
    </View>
  );
}

function SelectWallet({ route, navigation }) {
  return (
    <View style={styles.root}>
      <Text>GAS FEES</Text>
    </View>
  );
}

export default SelectWallet;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
