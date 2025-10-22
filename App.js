import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./context/CartContext";

// 🏠 Bottom Tabs (Main Navigation)
import MyTabs from "./components/Tabs";

// 🛒 Product and Cart Flow
import SelectItemPage from "./components/SelectedItem";
import CartPage from "./components/CartPage";
import CategoryScreen from "./components/CategoryScreen";
import DeliveryAddressScreen from "./components/DeliveryAddressScreen";
import OrderSummaryScreen from "./components/OrderSummaryScreen";
import PaymentScreen from "./components/PaymentScreen";
import OrderSuccessScreen from "./components/OrderSuccessScreen";



// 🔐 Authentication Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// 🎬 Animation and Intro Screens
import AnimationScreen from "./screens/AnimationScreen";
import FirstScreen from "./screens/FirstScreen";
import OrganicDeliveryScreen from "./screens/OrganicDeliveryScreen";
import FastDeliveryScreen from "./screens/FastDeliveryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="FirstScreen"
          screenOptions={{
            headerShown: false, // hides headers for all pages
            headerStyle: { backgroundColor: "#fff8dc" },
            headerTitleStyle: { color: "#ff9f0d", fontWeight: "700" },
          }}
        >
          {/* 🌿 Main Tab Navigation */}
          <Stack.Screen name="MyTabs" component={MyTabs} />

          {/* 🛍 Product Flow */}
          <Stack.Screen name="SelectItem" component={SelectItemPage} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Category" component={CategoryScreen} />

          {/* 🧾 Checkout Flow */}
          <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />



          {/* 🔐 Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* 🎬 Intro & Animation */}
          <Stack.Screen name="Animation" component={AnimationScreen} />
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="OrganicDelivery" component={OrganicDeliveryScreen} />
          <Stack.Screen name="FastDelivery" component={FastDeliveryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
