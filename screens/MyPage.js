import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { createAccount, getAccount } from "@rly-network/mobile-sdk";

import SmallIndex from "../components/UI/SmallIndex";
import { GlobalStyles } from "../constants/styles";
import { fetchPoint, fetchWallet, postWallet } from "../util/http";
import { PointContext } from "../store/point-context";
import { WalletContext } from "../store/wallet-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function MyPage({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [rlyAccount, setRlyAccount] = useState();

  const pointCtx = useContext(PointContext);
  const walletCtx = useContext(WalletContext);

  useEffect(() => {
    getPoint();
    getWallet();
  }, []);

  useEffect(() => {
    async function readAccount() {
      const account = await getAccount();
      console.log("user account", account);
      setAccountLoaded(true);
      if (account) {
        setRlyAccount(account);
        const rlyWalletData = [
          {
            walletId: 999,
            walletName: "Rally Account",
            walletAddress: rlyAccount,
          },
        ];
        walletCtx.setWallet(rlyWalletData);
      }
    }

    if (!accountLoaded) {
      readAccount();
    }
  }, [accountLoaded]);

  async function getPoint() {
    try {
      setIsFetching(true);
      const point = await fetchPoint();
      pointCtx.setPoint(point);
    } catch (error) {
      console.log("Error! ", error.response);
    }
    setIsFetching(false);
  }

  async function getWallet() {
    try {
      setIsFetching(true);
      const walletList = await fetchWallet();
      walletCtx.setWallet(walletList);
      console.log("walletCtx: ", walletCtx.wallets);
    } catch (error) {
      console.log("Error: ", error.response);
    }
    setIsFetching(false);
  }

  const createRlyAccount = async () => {
    const rlyAct = await createAccount();
    const rlyWalletdata = {
      walletName: "Rally Account",
      walletAddress: rlyAct,
    };
    const newWallet = await postWallet(rlyWalletdata);
    walletCtx.addWallet(newWallet);
  };

  const chargeButtonHandler = () => {
    navigation.navigate("ChargePoint");
  };

  const copyWalletAdress = () => {};

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.root}>
      <SmallIndex>CURRENT POINT</SmallIndex>
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>{pointCtx.point} P</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={chargeButtonHandler}>
          <View style={styles.chargeButton}>
            <Text style={styles.chargeButtonText}>CHARGE +</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.walletsLabel}>Wallets</Text>
      {/* TODO: account 있는지에 따라 아예 컴포넌트 분리해 표시해주기 
                + 생성한 지갑 서버에 추가하기
                + 지갑 표시 컴포넌트 분리해서 각각 복사할 수 있게 해야함
                + 유저 커스텀 지갑 추가 가능하게 해야함
      */}

      <TouchableOpacity activeOpacity={0.7} onPress={copyWalletAdress}>
        <View style={styles.connectButton}>
          <Text style={styles.connectButtonText}>
            {walletCtx.wallets[0].walletName}
          </Text>
          <Text style={styles.walletAccountText}>
            {walletCtx.wallets[0].walletAddress}
          </Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={accountLoaded ? copyWalletAdress : createRlyAccount}
      >
        <View style={styles.connectButton}>
          {accountLoaded ? (
            <>
              <Text style={styles.connectButtonText}>
                {rlyAccount ? "Rally Account" : "Connect Rally Protocol"}
              </Text>
              {rlyAccount && (
                <Text style={styles.walletAccountText}>{rlyAccount}</Text>
              )}
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    paddingTop: 28,
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
  walletAccountText: {
    color: GlobalStyles.colors.gray300,
    fontSize: 12,
    fontFamily: GlobalStyles.fonts.regular,
    marginTop: 4,
  },
});
