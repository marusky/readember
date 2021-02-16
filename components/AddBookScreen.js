import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from "react-native";
import { firestore } from "../config";
import { useGlobalContext, refresh } from "../context";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBook } from "../redux/actions";

const AddBookScreen = ({ closeModal, addBook }) => {
  const [book, setBook] = useState({
    id: uuid.v1(),
    title: "",
    author: "",
    pagesTotal: "",
    pagesRead: "0",
    readingTime: "0",
    lastReadAt: new Date().toLocaleString(),
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [readInPast, setReadInPast] = useState(false);
  const { userID, refresh } = useGlobalContext();

  // const addBook = async (title, author, pages, imageUrl, readInPast) => {
  //   // zatial pocitam s tym, ze som online, ked pridavam knihu
  //   const id = uuid.v1();
  //   const book = { title, author, pages, imageUrl, readInPast };
  //   const res = await firestore.collection(userID).doc(id).set(book);

  //   // // create userID dir
  //   // var documentsDir = await FileSystem.readDirectoryAsync(
  //   //   FileSystem.documentDirectory
  //   // );
  //   // if (!documentsDir.includes(userID)) {
  //   //   var directory = await FileSystem.makeDirectoryAsync(
  //   //     `${FileSystem.documentDirectory}${userID}`
  //   //   );
  //   // }

  //   // // create userID/images dir
  //   // var userDir = await FileSystem.readDirectoryAsync(
  //   //   `${FileSystem.documentDirectory}${userID}`
  //   // );
  //   // if (!documentsDir.includes("images")) {
  //   //   var directory = await FileSystem.makeDirectoryAsync(
  //   //     `${FileSystem.documentDirectory}${userID}/images`
  //   //   );
  //   // }

  //   // // create userID/books dir
  //   // var userDir = await FileSystem.readDirectoryAsync(
  //   //   `${FileSystem.documentDirectory}${userID}`
  //   // );
  //   // if (!documentsDir.includes("books")) {
  //   //   var directory = await FileSystem.makeDirectoryAsync(
  //   //     `${FileSystem.documentDirectory}${userID}/books`
  //   //   );
  //   // }

  //   // download image into image folder (save as bookID.jpg)
  //   const downloadedImage = await FileSystem.downloadAsync(
  //     imageUrl,
  //     `${FileSystem.documentDirectory}${userID}/images/${id}.jpg`
  //   );
  //   if (downloadedImage.status != 200) {
  //     console.log("mame tu error bro AddBookScreen");
  //   }

  //   // get the image uri (imageInfo.uri)
  //   const imageInfo = await FileSystem.getInfoAsync(
  //     `${FileSystem.documentDirectory}${userID}/images/${id}.jpg`
  //   );

  //   // save JSON
  //   const bookLocal = { ...book, uri: imageInfo.uri };
  //   console.log(bookLocal);
  //   const bookJSON = JSON.stringify(bookLocal);
  //   const write = await FileSystem.writeAsStringAsync(
  //     `${FileSystem.documentDirectory}${userID}/books/${id}.txt`,
  //     bookJSON
  //   );

  //   refresh();
  //   closeModal();
  // };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={closeModal}>
              <Text style={{ ...styles.button, color: "crimson" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>Add New Book</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              addBook({
                id: uuid.v1(),
                title,
                author,
                pagesTotal: pages,
                pagesRead: "0",
                readingTime: "0",
                lastReadAt: new Date().toLocaleString(),
              })
            }
          >
            <Text
              style={{
                ...styles.button,
                color: "deepskyblue",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Book Title"
            style={styles.input}
            value={book.title}
            onChangeText={(title) => setBook({ ...book, title })}
          />
          <TextInput
            placeholder="Author"
            style={styles.input}
            value={book.author}
            onChangeText={(author) => setBook({ ...book, author })}
          />
          <TextInput
            placeholder="Number of Pages"
            style={styles.input}
            value={book.pagesTotal}
            onChangeText={(pagesTotal) => setBook({ ...book, pagesTotal })}
            keyboardType="number-pad"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text style={{ ...styles.input }}>Read in past</Text>
            <Switch
              style={styles.switch}
              value={readInPast}
              onValueChange={(value) => setReadInPast(value)}
            />
          </View>
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addBook }, dispatch);
export default connect(null, mapDispatchToProps)(AddBookScreen);

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    marginTop: "10%",
    marginLeft: 0,
    backgroundColor: "#ddd",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    height: 70,
    flexDirection: "row",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    backgroundColor: "whitesmoke",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderColor: "gray",
  },
  button: {
    paddingHorizontal: 25,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: "whitesmoke",
    borderColor: "gray",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    marginVertical: 20,
  },
  input: {
    marginLeft: 20,
    paddingVertical: 15,
    fontSize: 16,
    borderBottomWidth: 0.3,
    borderColor: "gray",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch: {
    marginRight: 20,
  },
});
