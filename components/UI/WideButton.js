import { Pressable, View, StyleSheet, Text } from "react-native";

function WideButton({ children }) {
  return (
    <View>
      <Pressable>
        <View>
          <Text>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default WideButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
  },
});
