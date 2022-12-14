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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const handlePasswordVisibility = () => {
    if (passwordVisibility) {
      setPasswordVisibility(false);
      return;
    }
    setPasswordVisibility(true);
  };

  const onLogin = () => {
    console.log("Credentials", `${email} + ${password}` + `${logoImage}`);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ marginBottom: 27 }}>
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
        <AppButton title={"Log in"} onPress={onLogin} />
        <TouchableOpacity style={{ alignItems: "center", marginVertical: 16 }}>
          <Text style={styles.loginText}>No account? Sing in.</Text>
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

    marginVertical: 33,
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
