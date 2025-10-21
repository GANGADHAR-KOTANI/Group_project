import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./context/CartContext";

import MyTabs from "./components/Tabs";
import SelectItemPage from "./components/SelectedItem";
import CartPage from "./components/CartPage";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
// import AnimationScreen from "./screens/AnimationScreen"; // optional

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#fff8dc" },
            headerTitleStyle: { color: "#ff9f0d", fontWeight: "700" },
            headerShown: false,
          }}
        >
          {/* Bottom Tabs (main app area) */}
          <Stack.Screen name="MainTabs" component={MyTabs} />

          {/* Product Details */}
          <Stack.Screen name="SelectItem" component={SelectItemPage} />

          {/* Cart Page (linked from View Cart button) */}
          <Stack.Screen name="Cart" component={CartPage} />

          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Optional Animation */}
          {/* <Stack.Screen name="Animation" component={AnimationScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
