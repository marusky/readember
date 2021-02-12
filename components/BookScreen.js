import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Timer from "./Timer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchBooks } from "../redux/actions/index";

const BookScreen = ({ route, fetchUser, fetchBooks, currentUser, books }) => {
  console.log(books);
  const { title, author, id } = route.params.book;
  const [isHeaderShown, setIsHeaderShown] = useState(false);
  const [statusBarContent, setStatusBarContent] = useState("light");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isStopped, setIsStopped] = useState(false);

  const hideHeader = () => {
    setIsPlaying(false);
    setIsHeaderShown(false);
  };

  const openHeader = () => {
    setIsPlaying(true);
    setIsHeaderShown(true);
  };

  const updateReadingTimeDB = async (readingTime) => {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        isVisible={isHeaderShown}
        style={{ flex: 1 }}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        onSwipeComplete={hideHeader}
        swipeDirection="up"
        hasBackdrop={true}
        swipeThreshold={50}
      >
        <View style={styles.readingHeader}>
          <View style={styles.content}>
            <View style={{ width: "33%" }}>
              <Timer
                isPlaying={isPlaying}
                bookID={id}
                isStopped={!isHeaderShown}
              />
            </View>
            <View style={{ minWidth: "33%" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                0 / 20
              </Text>
            </View>
            {/* <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                numberOfLines={1}
              >
                {title.length > 20 ? `${title.substring(0, 18)}...` : title}
              </Text>
            </View> */}
            <View
              style={{
                ...styles.buttons,

                width: "33%",
                justifyContent: "flex-end",
              }}
            >
              {isPlaying ? (
                <TouchableOpacity
                  onPress={() => setIsPlaying(false)}
                  onLongPress={hideHeader}
                >
                  <Ionicons
                    name="stop-circle-outline"
                    size={50}
                    color="white"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsPlaying(true)}>
                  <Ionicons
                    name="play-circle-outline"
                    size={50}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <StatusBar
          barStyle={!isHeaderShown ? "light-content" : "dark-content"}
        />
      </Modal>
      <Text>{title}</Text>
      <Button title="read!" onPress={openHeader} />
      <Button title="pokus" onPress={fetchUser} />
      <Button title="fetch books" onPress={fetchBooks} />
      {currentUser ? <Text>{currentUser.name}</Text> : <Text>not yet</Text>}
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  books: store.booksState.books,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchBooks }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);

const styles = StyleSheet.create({
  readingHeader: {
    position: "absolute",
    top: -22,
    left: -22,
    right: -22,
    height: 110,
    paddingTop: 30,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "turquoise",
  },
  content: {
    // backgroundColor: "black",
    width: "100%",
    height: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
