import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";

import WideButton from "../components/UI/WideButton";
import { patchMintingMaterial } from "../util/http";
import { GlobalStyles } from "../constants/styles";
import { NftsContext } from "../store/nfts-context";
import { WalletContext } from "../store/wallet-context";
import { fetchWallet } from "../util/http";

function MintingNft({ route, navigation }) {
  const walletCtx = useContext(WalletContext);
  const nftsCtx = useContext(NftsContext);
  const [titleValue, setTitleValue] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const materialId = route.params.materialId;
  const contextMaterial = nftsCtx.nfts.find(
    (nft) => nft.materialId === materialId
  );

  useEffect(() => {
    console.log("wallet context: ", walletCtx);
    getWallet();
  }, []);

  function titleInputChangeHandler(enteredValue) {
    setTitleValue(enteredValue);
  }

  function mintingButtonHandler() {
    navigation.goBack();
  }

  async function getWallet() {
    setIsFetching(true);
    try {
      const walletListData = await fetchWallet();
      walletCtx.setWallet(walletListData);
      console.log("walletCtx: ", walletCtx.wallets);
    } catch (error) {
      console.log("Error: ", error.response);
    }
    setIsFetching(false);
  }

  async function mintMaterial() {
    const nftData = {
      title: titleValue,
      walletAddress: walletCtx.wallets[0].walletAddress,
      network: "MUMBAI",
    };
    const response = await patchMintingMaterial();
  }

  function getFormattedAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function selectNetworkHandler() {
    navigation.navigate("SelectNetwork");
  }

  // TODO: 키보드에따라 민팅 버튼 높이 조정하기
  //        + 지갑 context로 관리하게 수정. 이 화면에서 접근할 수 있게 하고, 데이터 띄워주기
  //        + 지갑 및 네트워크 선택뷰 만들기

  return (
    <View style={styles.root}>
      <ScrollView style={styles.formContainer}>
        <View style={[styles.block, styles.titleInputContainer]}>
          <TextInput
            style={[
              styles.titleInput,
              styles.optionText,
              styles.optionTitleText,
            ]}
            placeholder={"NFT Title"}
            placeholderTextColor={GlobalStyles.colors.gray400}
            onChange={titleInputChangeHandler}
          />
        </View>
        <View style={styles.block}>
          <Text style={[styles.optionText, styles.optionTitleText]}>
            Wallet
          </Text>
          <Text style={[styles.optionText, styles.optionContentText]}>
            {getFormattedAddress(walletCtx.wallets[0].walletAddress)}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.block}
          onPress={selectNetworkHandler}
        >
          <Text style={[styles.optionText, styles.optionTitleText]}>
            Network
          </Text>
          <View style={styles.optionContentView}>
            <Text style={[styles.optionText, styles.optionContentText]}>
              {walletCtx.selectedNetwork[0].displayName}
            </Text>
            <Ionicons
              name="chevron-forward"
              color={GlobalStyles.colors.gray200}
              size={16}
              style={styles.optionContentIcon}
            />
          </View>
        </TouchableOpacity>
        <AutoHeightImage
          source={{ uri: contextMaterial.source }}
          width={Dimensions.get("window").width - 36}
          style={styles.image}
        />
      </ScrollView>
      {titleValue && (
        <WideButton style={styles.mintingButton} onPress={mintingButtonHandler}>
          Checkout 200P
        </WideButton>
      )}
    </View>
  );
}

export default MintingNft;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  formContainer: {
    padding: 3,
  },
  block: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: GlobalStyles.colors.gray700,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleInputContainer: {
    marginTop: 24,
  },
  titleInput: {
    width: "100%",
  },
  optionText: {
    fontSize: 16,
  },
  optionTitleText: {
    color: "white",
  },
  optionContentText: {
    color: GlobalStyles.colors.gray200,
  },
  optionContentView: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionContentIcon: {
    marginLeft: 4,
  },
  image: {
    marginBottom: 100,
  },
  mintingButton: {
    marginHorizontal: 18,
    position: "absolute",
    bottom: 30,
  },
});
