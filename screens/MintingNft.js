import { useContext, useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import WideButton from "../components/UI/WideButton";
import { patchMintingMaterial } from "../util/http";
import { GlobalStyles } from "../constants/styles";
import { NftsContext } from "../store/nfts-context";
import { WalletContext } from "../store/wallet-context";

function MintingNft({ route, navigation }) {
  const nftsCtx = useContext(NftsContext);
  const materialId = route.params.materialId;
  const contextMaterial = nftsCtx.nfts.find(
    (nft) => nft.materialId === materialId
  );
  const walletCtx = useContext(WalletContext);

  const [titleValue, setTitleValue] = useState("");

  function titleInputChangeHandler(enteredValue) {
    setTitleValue(enteredValue);
  }

  function mintingButtonHandler() {
    navigation.goBack();
  }

  async function mintMaterial() {
    const nftData = {
      title: titleValue,
      walletAddress: walletCtx.wallets[0].walletAddress,
      network: "MUMBAI",
    };
    const response = await patchMintingMaterial();
  }

  // TODO: 키보드에따라 민팅 버튼 높이 조정하기
  //        + 지갑 context로 관리하게 수정. 이 화면에서 접근할 수 있게 하고, 데이터 띄워주기
  //        + 지갑 및 네트워크 선택뷰 만들기

  return (
    <View style={styles.root}>
      <View style={styles.formContainer}>
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
            {/* {walletCtx.wallets[0].walletAddress} */}
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={[styles.optionText, styles.optionTitleText]}>
            Network
          </Text>
          <Text style={[styles.optionText, styles.optionContentText]}>
            Polygon Mumbai Testnet
          </Text>
        </View>
        <AutoHeightImage
          source={{ uri: selectedMaterial.source }}
          width={Dimensions.get("window").width - 36}
        />
      </View>
      {titleValue && (
        <WideButton onPress={mintingButtonHandler}>Checkout 200P</WideButton>
      )}
    </View>
  );
}

export default MintingNft;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
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
    marginTop: 10,
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
  mintingButton: {
    marginHorizontal: 18,
  },
});
