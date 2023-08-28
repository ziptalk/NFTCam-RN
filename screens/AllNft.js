import { FlatList, StyleSheet, View } from "react-native";

function AllNft() {
  return (
    <View>
      <FlatList />
    <View style={styles.root}>
      <IconTextButton style={styles.createButton} icon="add" color={"white"}>
        Create
      </IconTextButton>
    </View>
  );
}

export default AllNft;

const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  createButton: {
    position: "absolute",
    bottom: 30,
  },
});
