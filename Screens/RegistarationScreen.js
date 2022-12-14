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
} from "react-native";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";

export default function Registartion() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logoImage, setLogoImage] = useState(null);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const logoImageHandel = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setLogoImage(result.assets[0].uri);
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordVisibility) {
      setPasswordVisibility(false);
      return;
    }
    setPasswordVisibility(true);
  };

  const onLogin = () => {
    console.log(
      "Credentials",
      `${login} + ${email} + ${password}` + `${logoImage}`
    );
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgHolder}>
        {logoImage && (
          <Image
            source={{ uri: logoImage }}
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
            value={login}
            onChangeText={loginHandler}
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
            value={email}
            onChangeText={emailHandler}
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
              value={password}
              onChangeText={passwordHandler}
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
        <TouchableOpacity style={{ alignItems: "center", marginVertical: 16 }}>
          <Text style={styles.loginText}>Already have an account? Log in.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
