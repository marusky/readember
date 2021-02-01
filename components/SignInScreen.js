import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useGlobalContext } from "../context";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        title="Sign In"
        color="black"
        onPress={() => signIn(email, password)}
      />
      <Button
        title="Go To Register"
        color="salmon"
        onPress={() => navigation.navigate("Sign Up")}
      />
    </View>
  );
};

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

export default SignInScreen;
