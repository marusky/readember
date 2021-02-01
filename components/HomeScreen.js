import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Switch, TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { auth } from "../config";
import AddBookScreen from "./AddBookScreen";

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("done");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        this is HOME screen
      </Text>
      <Button title="sign out" onPress={signOut} />
      <Button title="add book" onPress={() => setIsModalOpen(true)} />
      {/* <AddBookScreen isModalOpen={isModalOpen} closeModal={closeModal} /> */}
      <Modal
        isVisible={isModalOpen}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={{
          width: "100%",
          marginLeft: 0,
        }}
      >
        <AddBookScreen closeModal={closeModal} />
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
