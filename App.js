import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Fonts } from "./constants/fonts";

export default function App() {
  const [fontsLoaded] = useFonts({
    "sf-pro-regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "sf-pro-thin": require("./assets/fonts/SF-Pro-Text-Thin.otf"),
    "sf-pro-medium": require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    "sf-pro-semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    "sf-pro-bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  });

  // if (!fontsLoaded) {
  // }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={Fonts.bold}>Bold Text!!</Text>
      <StatusBar style="auto" />
    </View>
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
