import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingUpScreen from "./SingUpScreen";
import SignInScreen from "./SignInScreen";
import HomeScreen from "./HomeScreen";
import { useGlobalContext } from "../context";
import { auth } from "../config";
import { set } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";

const Stack = createStackNavigator();

const Root = () => {
  const { userSignedIn, setUserID } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState("");

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

  const saveImage = async () => {
    const downloadedFile = await FileSystem.downloadAsync(
      "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3930/9780393061055.jpg",
      FileSystem.documentDirectory + "image01.jpg"
    );
    if (downloadedFile.status != 200) {
      console.log("mame tu error bro");
    }
  };

  const loadImage = async () => {
    const imageInfo = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "image01.jpg"
    );
    setTest(imageInfo.uri);
  };
  // local storage
  useEffect(() => {
    // saveImage();
    loadImage();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        {/* {test ? (
          <Image source={{ uri: test }} style={{ width: 100, height: 200 }} />
        ) : (
          <Text>fero</Text>
        )} */}
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
