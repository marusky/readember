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
import NetInfo from "@react-native-community/netinfo";
import BookScreen from "./BookScreen";

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

  // useEffect(() => {
  //   // Subscribe
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log("Connection type", state.type);
  //     console.log("Is connected?", state.isConnected);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

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

  const saveString = async () => {
    const object = {
      pes: "dog",
      macka: { name: "Lauka", animal: "cat", age: 5 },
    };
    const jsonObject = JSON.stringify(object);
    const string = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "books.txt",
      jsonObject
    );
  };

  const loadString = async () => {
    const string = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "books.txt"
    );
    const obj = JSON.parse(string);
    console.log(obj);
  };

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

          <Stack.Screen
            name="BookScreen"
            component={BookScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Sign Up" component={SingUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
