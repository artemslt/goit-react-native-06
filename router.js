import Login from "./Screens/LoginScreen";
import Registartion from "./Screens/RegistarationScreen";

import Home from "./Screens/Main/Home";
import CommentsScreen from "./Screens/Main/CommentsScreen";
import MapScreen from "./Screens/Main/MapScreen";

import { createStackNavigator } from "@react-navigation/stack";
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registartion"
          component={Registartion}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default useRoute;
