import {
  Image,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function PostItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.photo }} style={{ height: 500 }} />
      <View style={styles.infoWrapper}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
