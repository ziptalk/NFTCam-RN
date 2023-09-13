import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { NETWORKS, WalletContext } from "../store/wallet-context";

function SelectNetwork({ route, navigation }) {
  const walletCtx = useContext(WalletContext);

  function selectWalletHandler(networkId) {
    walletCtx.selectNetwork(networkId);
    navigation.goBack();
  }

  return (
    <View style={styles.root}>
      <Text style={styles.labelText}>GAS FEES</Text>
      {NETWORKS.map((network) => (
        <TouchableOpacity
          style={styles.networkContainer}
          key={network.identifier}
          onPress={() => {
            selectWalletHandler(network.identifier);
          }}
        >
          <View style={styles.networkIcon}>
            <network.icon width={20} height={20} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.networkText}>{network.displayName}</Text>
            <Text style={styles.networkText}>{network.gasFee} P</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default SelectNetwork;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  labelText: {
    fontSize: 12,
    fontFamily: GlobalStyles.fonts.medium,
    color: GlobalStyles.colors.gray400,
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 15,
    marginBottom: 8,
  },
  networkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  networkIcon: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.gray600,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomColor: GlobalStyles.colors.gray700,
    borderBottomWidth: 1,
  },
  networkText: {
    color: "white",
    fontSize: 16,
  },
});
