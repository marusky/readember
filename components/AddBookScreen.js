import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
} from "react-native";

import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBook } from "../redux/actions";

const AddBookScreen = ({ closeModal, addBook }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  const getPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const takePicture = async () => {
    const data = await camera.takePictureAsync(null);
    setBook({ ...book, image: data.uri });
  };
  const [book, setBook] = useState({
    id: uuid.v1(),
    title: "",
    author: "",
    image: null,
    pagesTotal: "",
    pagesRead: "0",
    readingTime: "0",
    lastReadAt: new Date().toLocaleString(),
  });

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
          <TouchableOpacity onPress={() => addBook(book)}>
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
        <View style={styles.imageContainer}>
          {hasPermission ? (
            book.image ? (
              <Image
                source={{ uri: book.image }}
                style={{ width: 150, height: 200 }}
              />
            ) : (
              <TouchableOpacity onPress={takePicture}>
                <Camera
                  ref={(ref) => setCamera(ref)}
                  style={{ width: 150, height: 200 }}
                  type={Camera.Constants.Type.back}
                  ratio="4:3"
                ></Camera>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity onPress={getPermission}>
              <MaterialCommunityIcons
                name="image-plus"
                size={100}
                color="white"
              />
            </TouchableOpacity>
          )}
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
  imageContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    backgroundColor: "whitesmoke",
    height: 200,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
