import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useGlobalContext } from ".././context";

const SignInScreen = () => {
  const { name, changeName } = useGlobalContext();

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Button title="set Peter" onPress={() => changeName("Peter")} />
      <Button title="set Fero" onPress={() => changeName("Fero")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
