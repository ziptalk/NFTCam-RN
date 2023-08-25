import { Pressable, View, StyleSheet, Text } from "react-native";
import { Fonts } from "../../constants/fonts";

function WideButton({ children }) {
  return (
    <View>
      <Pressable>
        <View style={styles.button}>
          <Text style={[Fonts.semibold, styles.text]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default WideButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
    padding: 16,
  },
  text: {
    fontSize: 17,
  },
});
