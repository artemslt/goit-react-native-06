import React, { useEffect, useCallback, useState } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { authStateChangeUsers } from "./redux/auth/authOperation";

export default function App() {
  // const routing = useRoute(false);
  // const { stateChange } = useSelector((state) => state.auth);
  // console.log(stateChange);

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
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(authStateChangeUsers());
  // }, [stateChange]);
  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  //   console.log(user);
  // });

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

function Route() {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUsers());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
