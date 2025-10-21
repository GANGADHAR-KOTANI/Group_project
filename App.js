import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AnimationScreen from "./screens/AnimationScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"  // intial loading is login Screen
        screenOptions={{
          headerStyle: { backgroundColor: "#fff8dc" },
          headerTitleStyle: { color: "#ff9f0d", fontWeight: "700" },
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomePage} options={{ title: "Fresh Market" }} />
        <Stack.Screen name="Cart" component={CartPage} options={{ title: "Your Cart" }} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
