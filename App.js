import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import AllNft from "./screens/AllNft";
import NftDetail from "./screens/NftDetail";
import MintingNft from "./screens/MintingNft";
import MyPage from "./screens/MyPage";
import ChargePoint from "./screens/ChargePoint";
import NftsContextProvider from "./store/nfts-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    "sf-pro-regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "sf-pro-thin": require("./assets/fonts/SF-Pro-Text-Thin.otf"),
    "sf-pro-medium": require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    "sf-pro-semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    "sf-pro-bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  });

  if (!fontsLoaded) {
    console.log("not loaded");
  }

  // TODO: 폰트 로딩 여부에 따라 스플래시 표시하기

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="light" />
      <NftsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AllNft"
            screenOptions={{
              headerStyle: { backgroundColor: "#1D1D1D" },
              headerTitleStyle: { color: "white" },
              contentStyle: { backgroundColor: "#151515" },
            }}
          >
            <Stack.Screen
              name="AllNft"
              component={AllNft}
              options={{
                title: "Home",
              }}
            />
            <Stack.Screen name="NftDetail" component={NftDetail} />
            <Stack.Screen
              name="MintingNft"
              component={MintingNft}
              options={{
                title: "Minting",
              }}
            />
            <Stack.Screen
              name="MyPage"
              component={MyPage}
              options={{
                title: "My Page",
              }}
            />
            <Stack.Screen
              name="ChargePoint"
              component={ChargePoint}
              options={{
                title: "Charge Point",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NftsContextProvider>
    </>
  );
}
