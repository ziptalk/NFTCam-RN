import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import EthereumLogo from "../assets/icons/ethereum.svg";
import PolygonLogo from "../assets/icons/polygon.svg";
import { GlobalStyles } from "../constants/styles";

export const NETWORKS = [
  {
    name: "Ethereum Sepolia Testnet",
    gasFee: 200,
    identifier: "SEPOLIA",
    icon: EthereumLogo,
  },
  {
    name: "Polygon Mumbai Testnet",
    gasFee: 200,
    identifier: "MUMBAI",
    icon: PolygonLogo,
  },
];

function SelectNetwork({ route, navigation }) {
  return (
    <View style={styles.root}>
      <Text style={styles.labelText}>GAS FEES</Text>
      {NETWORKS.map((network) => (
        <TouchableOpacity
          style={styles.networkContainer}
          key={network.identifier}
        >
          <View style={styles.networkIcon}>
            <network.icon width={20} height={20} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.networkText}>{network.name}</Text>
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
