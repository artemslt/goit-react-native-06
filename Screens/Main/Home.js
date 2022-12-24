import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import PostsScreen from "./PostsScreen";
import CreateScreen from "./CreateScreen";
import ProfileScreen from "./ProfileScreen";

import ArrowLeft from "../../assets/imgs/arrow-left.svg";
import Grid from "../../assets/imgs/gridIcon.svg";
import User from "../../assets/imgs/userIcon.svg";
import Plus from "../../assets/imgs/newIcon.svg";
import Logout from "../../assets/imgs/log-out.svg";

const BottomTab = createBottomTabNavigator();

export default Home = ({ navigation }) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 63, justifyContent: "center" },
        headerTitleAlign: "center",
        headerStyle: { height: 68 },
        headerShadowVisible: {
          elevation: 1,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 27.18,
        },
        headerTitleStyle: {
          marginBottom: 11,
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <BottomTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () => <Grid width={40} height={40} />,
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity>
              <Logout width={24} height={24} stroke="#212121" />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarVisible: false,
          tabBarIcon: () => <Plus width={70} height={40} />,
          headerLeft: () => (
            <ArrowLeft width={24} height={24} stroke="#212121" />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <User width={40} height={40} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
