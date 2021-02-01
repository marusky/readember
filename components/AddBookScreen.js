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
} from "react-native";

const AddBookScreen = ({ closeModal }) => {
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [readInPast, setReadInPast] = useState(false);
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
          <TouchableOpacity>
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
            placeholder="Name of Book"
            style={styles.input}
            value={book}
            onChangeText={(book) => setBook(book)}
          />
          <TextInput
            placeholder="Author"
            style={styles.input}
            value={author}
            onChangeText={(author) => setAuthor(author)}
          />
          <TextInput
            placeholder="Number of Pages"
            style={styles.input}
            value={pages}
            onChangeText={(pages) => setPages(pages)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text style={{ ...styles.input }}>Read in past</Text>
            <Switch
              style={styles.switch}
              value={readInPast}
              onValueChange={(value) => setReadInPast(value)}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddBookScreen;

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
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