import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "./components/SignInScreen";
import SingUpScreen from "./components/SingUpScreen";
import { AppProvider } from "./context";

export default function App() {
  return (
    <AppProvider>
      <SingUpScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7DFD4",
    alignItems: "center",
    justifyContent: "center",
  },
});
