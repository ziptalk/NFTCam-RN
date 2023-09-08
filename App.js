import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import AllNft from "./screens/AllNft";
import NftDetail from "./screens/NftDetail";
import MintingNft from "./screens/MintingNft";
import MyPage from "./screens/MyPage";
import ChargePoint from "./screens/ChargePoint";
import NftsContextProvider from "./store/nfts-context";
import { login } from "./util/http";
import PointContextProvider from "./store/point-context";

export default function App() {
  const Stack = createNativeStackNavigator();

  async function authenticateUser() {
    try {
      const tokens = await login();
      await AsyncStorage.setItem("accessToken", tokens.accessToken);
      await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
    } catch (error) {}
  }
  authenticateUser();

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

  // TODO: 폰트 로딩 방식 바꾸기

  return (
    <>
      <StatusBar style="light" />
      <NftsContextProvider>
        <PointContextProvider>
          <ActionSheetProvider>
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
                <Stack.Screen
                  name="NftDetail"
                  component={NftDetail}
                  options={{
                    headerShown: false,
                  }}
                />
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
          </ActionSheetProvider>
        </PointContextProvider>
      </NftsContextProvider>
    </>
  );
}
