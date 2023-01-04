import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";

import MessageIcon from "../../assets/imgs/message-circle.svg";
import ThumbIcon from "../../assets/imgs/thumbs-up.svg";
import LocationIcon from "../../assets/imgs/map-pin.svg";
import { useSelector, useDispatch } from "react-redux";
import { fsbase } from "../../firebase/config";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { logoImage, userId, login } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      onSnapshot(
        query(collection(fsbase, "posts"), where("userId", "==", userId)),
        (docSnap) => setPosts(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/imgs/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image style={styles.img} source={{ uri: logoImage }} />
              <Text style={styles.title}>{login}</Text>
            </View>

            <FlatList
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 16 }}>
                  <Image
                    style={{
                      width: windowWidth - 16 * 2,
                      height: 240,
                      borderRadius: 8,
                    }}
                    source={{ uri: item.photo }}
                  />
                  <Text style={styles.postTitle}>{item.name}</Text>
                  <View style={styles.infoWrapper}>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            photo: item.photo,
                            postId: item.userId,
                          })
                        }
                      >
                        <MessageIcon />
                      </TouchableOpacity>

                      <Text style={styles.infoText}>50</Text>
                      <ThumbIcon />
                      <Text style={styles.infoText}>200</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
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
                      <Text style={styles.infoText}>{item.locationName}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop: 80,
    position: "relative",
    backgroundColor: "#FFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    paddingTop: 92,
  },
  postTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
