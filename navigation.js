import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  HomeIcon,
  UserIcon,
  VideoCameraIcon,
} from "react-native-heroicons/outline";
import ManageAccount from "./screens/ManageAccount";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";
import CustomDrawerComponent from "./components/customDrawer";
import Splash from "./screens/Splash";
import { Orange, TextColor, iconBg } from "./constants";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={
        typeof isAuthenticated == "undefined" ? "Welcome" : "SignUp"
      }
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        // contentStyle: {
        //   backgroundColor: `#262626`,
        // },
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        // contentStyle: {
        //   backgroundColor: `#262626`,
        // },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const StackNavs = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        contentStyle: {
          backgroundColor: `#262626`,
        },
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};
export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headerBackVisible: false,
          headerShown: false,
          swipeEnabled: false,
          drawerLabelStyle: {
            marginLeft: -20,
          },
          drawerActiveBackgroundColor: Orange,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "gray",
        }}
        drawerContent={(props) => <CustomDrawerComponent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavs}
          options={{
            drawerIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{
            drawerLabel: "Manage Account",
            title: "Manage Account",
            drawerIcon: ({ color, size }) => (
              <UserIcon size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
