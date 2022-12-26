import { useState, useEffect } from "react";
import {
  Image,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CommetsIcon from "../../assets/imgs/Shape.svg";
import LocationIcon from "../../assets/imgs/map-pin.svg";
import PostItem from "../../components/Post";
const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!route.params) {
      return;
    }
    setPosts((prevstate) => [...prevstate, route.params]);
  }, [route.params]);

  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16 }}
          source={require("../../assets/imgs/UserPhoto.jpg")}
        />
        <View>
          <Text style={{ fontFamily: "Roboto-Bold" }}>user Login</Text>
          <Text style={{ fontFamily: "Roboto-Regular" }}>user Email</Text>
        </View>
      </View>
      <FlatList
        style={styles.postWrapper}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 240, borderRadius: 8 }}
            />
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#212121",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", { photo: item.photo })
                    }
                  >
                    <CommetsIcon />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 8,
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#BDBDBD",
                    }}
                  >
                    0
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                        locationName: item.locationName,
                        name: item.name,
                      })
                    }
                  >
                    <LocationIcon />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 8,
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                      lineHeight: 19,
                      textDecorationLine: "underline",
                      color: "#212121",
                    }}
                  >
                    {item.locationName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    paddingTop: 55,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },

  logOutBtn: {
    position: "absolute",
    top: 55,
    right: 16,
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  postWrapper: { marginTop: 32, paddingHorizontal: 16 },
});

export default PostsScreen;
