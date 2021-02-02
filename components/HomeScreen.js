import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Switch, TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { auth } from "../config";
import AddBookScreen from "./AddBookScreen";
import Books from "./Books";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.HomeScreen}>
      <View style={styles.bookContainer}>
        <Books />
      </View>
      <Button title="sign out" onPress={signOut} />
      <Button title="add book" onPress={() => setIsModalOpen(true)} />

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

const styles = StyleSheet.create({
  bookContainer: {
    height: 350,
  },
});
