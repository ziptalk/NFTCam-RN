import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createAccount, getAccount } from "@rly-network/mobile-sdk";
import axios from "axios";

import SmallIndex from "../components/UI/SmallIndex";
import { GlobalStyles } from "../constants/styles";
import { BASE_URL } from "../util/http";

function MyPage({ route, navigation }) {
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [rlyAccount, setRlyAccount] = useState();

  useEffect(() => {
    async function readAccount() {
      const account = await getAccount();
      console.log("user account", account);

      setAccountLoaded(true);

      if (account) {
        setRlyAccount(account);
      }
    }

    if (!accountLoaded) {
      readAccount();
    }
  }, [accountLoaded]);

  async function createWallet() {
    const response = await axios.post(BASE_URL + "/wallet", {
      walletName: "RallyProtocol",
      walletAdress: rlyAccount,
    });
  }

  const createRlyAccount = async () => {
    const rlyAct = await createAccount();
    setRlyAccount(rlyAct);
  };

  const chargeButtonHandler = () => {
    navigation.navigate("ChargePoint");
  };
  const copyWalletAdress = () => {};

  return (
    <View style={styles.root}>
      <SmallIndex>CURRENT POINT</SmallIndex>
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>5,432 P</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={chargeButtonHandler}>
          <View style={styles.chargeButton}>
            <Text style={styles.chargeButtonText}>CHARGE +</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.walletsLabel}>Wallets</Text>
      {/* TODO: account 있는지에 따라 아예 컴포넌트 분리해 표시해주기 
                + 생성한 지갑 서버에 추가하기
      */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={rlyAccount ? copyWalletAdress : createRlyAccount}
      >
        <View style={styles.connectButton}>
          <Text style={styles.connectButtonText}>
            {rlyAccount ? rlyAccount : "Connect Rally Protocol"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
  },
  pointContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointText: {
    color: "white",
    fontSize: 32,
    fontFamily: GlobalStyles.fonts.bold,
  },
  chargeButton: {
    backgroundColor: GlobalStyles.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 25,
  },
  chargeButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: GlobalStyles.fonts.semibold,
  },
  walletsLabel: {
    fontFamily: GlobalStyles.fonts.bold,
    fontSize: 20,
    color: "white",
    marginTop: 30,
    marginBottom: 16,
  },
  connectButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: GlobalStyles.colors.gray700,
  },
  connectButtonText: {
    color: "white",
    fontSize: 16,
  },
});
