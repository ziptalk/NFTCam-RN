import { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

import WideButton from "../components/UI/WideButton";
import { patchMintingMaterial } from "../util/http";

function MintingNft({ route, navigation }) {
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
      walletAddress: "0xb1350Bd24C114793A07C36aab9fEc04d58c5e488",
      network: "MUMBAI",
    };
    const response = await patchMintingMaterial();
  }

  // TODO: 키보드에따라 민팅 버튼 높이 조정하기
  //        + 지갑 및 네트워크 선택뷰 만들기
  //        + 지갑 context로 관리하게 수정. 이 화면에서 접근할 수 있게 하고, 데이터 띄워주기

  return (
    <View>
      <TextInput />
      <View>
        <Text>Wallet</Text>
        <Text></Text>
      </View>
      <View>
        <Text>Network</Text>
        <Text>Polygon Mumbai Testnet</Text>
      </View>
      {titleValue && <WideButton>Checkout 200P</WideButton>}
    </View>
  );
}

export default MintingNft;

const styles = StyleSheet.create({});
