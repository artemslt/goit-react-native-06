import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Registartion from "./Screens/RegistarationScreen";
import Login from "./Screens/LoginScreen";
import Home from "./Screens/Main/Home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// const AuthStack = createStackNavigator();/
// SplashScreen.preventAutoHideAsync();
import useRoute from "./route";

export default function App() {
  const routing = useRoute(true);
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // return (
  //   <View style={{ flex: 1 }}>
  //     <Text>HEllo</Text>
  //   </View>
  // );
  return <NavigationContainer>{routing}</NavigationContainer>;
}
