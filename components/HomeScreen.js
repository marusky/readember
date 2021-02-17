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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBooks, openAddBookModal } from "../redux/actions";

const HomeScreen = ({
  navigation,
  isAddBookOpen,
  openAddBookModal,
  fetchBooks,
}) => {
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
    fetchBooks();
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
      <Button title="add book" onPress={() => openAddBookModal(true)} />

      <Modal
        isVisible={isAddBookOpen}
        onSwipeComplete={() => openAddBookModal(false)}
        swipeDirection="down"
        style={{
          width: "100%",
          marginLeft: 0,
        }}
      >
        <AddBookScreen closeModal={() => openAddBookModal(false)} />
      </Modal>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openAddBookModal, fetchBooks }, dispatch);

const mapStateToProps = (store) => ({
  isAddBookOpen: store.booksState.isAddBookOpen,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  bookContainer: {
    height: 350,
  },
});
