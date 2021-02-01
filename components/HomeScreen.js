import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import { auth } from "../config";

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
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        this is HOME screen
      </Text>
      <Button title="sign out" onPress={signOut} />
      <Button title="add book" onPress={openModal} />
      {isModalOpen && (
        <Modal>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>fero</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
