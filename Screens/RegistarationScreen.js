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
} from "react-native";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const initialState = {
  login: "",
  email: "",
  password: "",
  logoImage: null,
};

export default function Registartion({ navigation }) {
  const [state, setState] = useState(initialState);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();

  const logoImageHandel = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevstate) => ({
        ...prevstate,
        logoImage: result.assets[0].uri,
      }));
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordVisibility) {
      setPasswordVisibility(false);
      return;
    }
    setPasswordVisibility(true);
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `logoImage/${uniquePostId}`);

    const response = await fetch(state.logoImage);
    const file = await response.blob();

    const uploadPhoto = await uploadBytes(storageRef, file).then(() => {});

    const photoUri = await getDownloadURL(
      ref(storage, `logoImage/${uniquePostId}`)
    )
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
    return photoUri;
  };

  const onLogin = async () => {
    try {
      const imageRef = await uploadPhotoToServer();
      console.log(`imageRef`, imageRef);

      setState((prevState) => ({ ...prevState, myImage: imageRef }));
      const newState = {
        logoImage: imageRef,
        login: state.login,
        email: state.email,
        password: state.password,
      };
      console.log(`newState`, newState);
      dispatch(authSignUpUser(newState));
      //   setState(initialState);
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log("error.messageRegister", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/imgs/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.container}>
            <View style={styles.imgHolder}>
              {state.logoImage && (
                <Image
                  source={{ uri: state.logoImage }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
              <TouchableOpacity style={styles.btnImg} onPress={logoImageHandel}>
                <Image source={require("../assets/imgs/add.png")} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Registartion</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{ marginBottom: 27 }}>
                <TextInput
                  value={state.login}
                  onChangeText={(text) =>
                    setState((prevstate) => ({
                      ...prevstate,
                      login: text.trim(),
                    }))
                  }
                  placeholder="Login"
                  style={
                    loginFocused
                      ? { ...styles.input, ...styles.inputFocused }
                      : styles.input
                  }
                  onFocus={() => setLoginFocused(true)}
                  onBlur={() => setLoginFocused(false)}
                />
                <TextInput
                  value={state.email}
                  onChangeText={(text) =>
                    setState((prevstate) => ({
                      ...prevstate,
                      email: text.trim(),
                    }))
                  }
                  placeholder="Email"
                  style={
                    emailFocused
                      ? { ...styles.input, ...styles.inputFocused }
                      : styles.input
                  }
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <View>
                  <TextInput
                    value={state.password}
                    onChangeText={(text) =>
                      setState((prevstate) => ({
                        ...prevstate,
                        password: text,
                      }))
                    }
                    placeholder="Password"
                    secureTextEntry={passwordVisibility}
                    style={
                      passwordFocused
                        ? { ...styles.input, ...styles.inputFocused }
                        : styles.input
                    }
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <Pressable
                    onPress={handlePasswordVisibility}
                    style={{ position: "absolute", right: 16, top: 20 }}
                  >
                    <Text style={styles.showField}>
                      {passwordVisibility ? "Show" : "Hide"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <AppButton title={"Register"} onPress={onLogin} />
              <TouchableOpacity
                style={{ alignItems: "center", marginVertical: 16 }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginText}>
                  Already have an account? Log in.
                </Text>
              </TouchableOpacity>
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
  input: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  inputFocused: {
    color: "#212121",
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    border: "1px solid #FF6C00",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
  imgHolder: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    // alignItems: "flex-end",
  },
  btnImg: {
    position: "absolute",
    height: 25,
    width: 25,
    left: 107,
    top: 80,
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    fontsize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showField: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#1B4371",
  },
});
