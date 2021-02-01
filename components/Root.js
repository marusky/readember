import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingUpScreen from "./SingUpScreen";
import SignInScreen from "./SignInScreen";
import HomeScreen from "./HomeScreen";
import { useGlobalContext } from "../context";
import { auth } from "../config";
import { set } from "react-native-reanimated";

const Stack = createStackNavigator();

const Root = () => {
  const { userSignedIn, setUserID } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        setUserID(user.uid);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SingUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
