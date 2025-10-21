import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#fff8dc" },
          headerTitleStyle: { color: "#ff9f0d", fontWeight: "700" },
        }}
      >
        <Stack.Screen name="Home" component={HomePage} options={{ title: "Fresh Market" }} />
        <Stack.Screen name="Cart" component={CartPage} options={{ title: "Your Cart" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
