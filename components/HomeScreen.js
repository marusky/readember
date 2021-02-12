import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  RefreshControl,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { auth } from "../config";
import AddBookScreen from "./AddBookScreen";
import Books from "./Books";
import { useGlobalContext } from "../context";

const HomeScreen = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { setNavigation } = useGlobalContext();
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

  useEffect(() => {
    setNavigation(navigation);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.HomeScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bookContainer: {
    height: 350,
  },
});
