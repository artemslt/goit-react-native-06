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
  ScrollView,
  Dimensions,
} from "react-native";

import MessageIcon from "../../assets/imgs/message-circle.svg";
import ThumbIcon from "../../assets/imgs/thumbs-up.svg";
import LocationIcon from "../../assets/imgs/map-pin.svg";

export default function Login({ navigation }) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/imgs/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={styles.img}
                  source={require("../../assets/imgs/Photo_BG.jpg")}
                />
                <Text style={styles.title}>Natali</Text>
                <View>
                  <Image
                    style={{
                      width: windowWidth - 16 * 2,
                      height: 240,
                      borderRadius: 8,
                    }}
                    source={require("../../assets/imgs/Photo_BG.jpg")}
                  />
                  <Text style={styles.postTitle}>Name of post</Text>
                  <View style={styles.infoWrapper}>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      <MessageIcon />
                      <Text style={styles.infoText}>50</Text>
                      <ThumbIcon />
                      <Text style={styles.infoText}>200</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      <LocationIcon />
                      <Text style={styles.infoText}>Location</Text>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
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
