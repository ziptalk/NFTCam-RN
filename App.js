import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllNft from "./screens/AllNft";
import NftDetail from "./screens/NftDetail";
import MintingNft from "./screens/MintingNft";
import MyPage from "./screens/MyPage";

export default function App() {
  const [fontsLoaded] = useFonts({
    "sf-pro-regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "sf-pro-thin": require("./assets/fonts/SF-Pro-Text-Thin.otf"),
    "sf-pro-medium": require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    "sf-pro-semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    "sf-pro-bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  });

  // TODO: 폰트 로딩 여부에 따라 스플래시 표시하기

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllNft" component={AllNft} />
          <Stack.Screen name="NftDetail" component={NftDetail} />
          <Stack.Screen name="MintingNft" component={MintingNft} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="ChargePoint" component={ChargePoint} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
