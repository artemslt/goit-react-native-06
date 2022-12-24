import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import AddPhot from "../../assets/imgs/Photo.svg";
import Location from "../../assets/imgs/map-pin.svg";
import DeletePost from "../../assets/imgs/trash.svg";
import AppButton from "../../components/AppButton";

export default function CreateScreen({ navigation }) {
  const [postImage, setPostImage] = useState(null);

  const [isPost, setIsPost] = useState(false);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}>
            {postImage && (
              <Image
                source={{ uri: postImage }}
                style={{
                  width: windowWidth - 16 * 2,
                  height: 240,
                  borderRadius: 8,
                }}
              />
            )}
            <TouchableOpacity style={{ height: 60, width: 60 }}>
              <AddPhot />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Download Photo</Text>
          <View style={{ marginBottom: 16 }}>
            <TextInput style={styles.input} placeholder="Name" />

            <Location style={styles.locationIcon} />
            <TextInput
              style={{ ...styles.input, paddingLeft: 32 }}
              placeholder="Location"
            />
          </View>
          <AppButton title="Publish" active={isPost} />
          <TouchableOpacity
            style={{
              alignItems: "center",
              marginTop: 120,
            }}
          >
            <DeletePost />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  imgHolder: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
});
