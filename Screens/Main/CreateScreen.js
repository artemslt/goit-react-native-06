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
import { Camera, CameraType } from "expo-camera";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { fsbase } from "../../firebase/config";
import AddPhot from "../../assets/imgs/Photo.svg";
import LocationIcon from "../../assets/imgs/map-pin.svg";
import DeletePost from "../../assets/imgs/trash.svg";
import Delete from "../../assets/imgs/delete.svg";

import AppButton from "../../components/AppButton";
import { useSelector } from "react-redux";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isPost, setIsPost] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);
  console.log(useSelector((state) => state.auth));
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    if (name && photo) {
      return setIsPost(true);
    }
  }, [name, photo]);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
    if (coords) {
      let { longitude, latitude } = coords;

      let regionName = await Location.reverseGeocodeAsync({
        longitude,
        latitude,
      });
      setLocationName(regionName[0].region);
      console.log(regionName);
    }

    setPhoto(uri);
    console.log("photo uri ", uri);
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `imagas/${uniquePostId}`);

    const response = await fetch(photo);
    const file = await response.blob();

    const uploadPhoto = await uploadBytes(storageRef, file).then(() => {});

    const processedPhoto = await getDownloadURL(
      ref(storage, `imagas/${uniquePostId}`)
    )
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
    return processedPhoto;
  };
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const setUserPost = await addDoc(collection(fsbase, "posts"), {
        photo,
        name,
        location,
        locationName,
        userId,
        login,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const sendInfo = () => {
    navigation.navigate("Posts");
  };
  const handlePublish = () => {
    if (isPost) {
      uploadPostToServer();
      sendInfo();
      uploadPhotoToServer();

      Keyboard.dismiss();
      return;
    }
    return alert("Fill post information");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          {photo ? (
            <View style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}>
              <Image
                source={{ uri: photo }}
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              />
              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                }}
                style={{
                  position: "absolute",
                  backgroundColor: "#BDBDBD",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.4,
                }}
              >
                <Delete width={60} height={60} />
              </TouchableOpacity>
            </View>
          ) : (
            <Camera
              style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              type={type}
              ref={(ref) => {
                setCamera(ref);
              }}
            >
              <TouchableOpacity
                style={{ height: 60, width: 60, opacity: 0.4 }}
                onPress={takePhoto}
              >
                <AddPhot />
              </TouchableOpacity>
            </Camera>
          )}
          <Text style={styles.text}>Make a Photo</Text>

          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(newText) => setName(newText)}
            />

            <Text
              style={{
                paddingLeft: 32,
                paddingVertical: 16,
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
                borderBottomWidth: 1,
                borderStyle: "solid",
                borderColor: "#E8E8E8",
              }}
            >
              {locationName}
            </Text>
            <LocationIcon style={styles.locationIcon} />
          </View>
          <AppButton title="Publish" active={isPost} onPress={handlePublish} />
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
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
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
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    height: 50,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
});
