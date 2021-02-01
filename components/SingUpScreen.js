import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useGlobalContext } from "../context";

const SingUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useGlobalContext();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        textContentType="password"
        style={styles.input}
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Button
        title="Sign Up"
        color="black"
        onPress={() => signUp(email, password)}
      />
    </View>
  );
};

export default SingUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    width: "50%",
  },
});
