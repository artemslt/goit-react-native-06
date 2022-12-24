import Login from "./Screens/LoginScreen";
import Registartion from "./Screens/RegistarationScreen";

import Home from "./Screens/Main/Home";

import { createStackNavigator } from "@react-navigation/stack";
const AuthStack = createStackNavigator(); // вказує на групу навігаторів

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
  return <Home />;
};

export default useRoute;
