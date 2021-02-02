import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { firestore } from "../config";
import { useGlobalContext } from "../context";
import BookComp from "./BookComp";

const Books = () => {
  const { userID } = useGlobalContext();
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const books = [];
    const userBooksRef = firestore.collection(userID); // order by lastReadAt
    const snapshot = await userBooksRef.get();
    snapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  //   nech sa to update-ne ked pridam knihu :D
  return (
    <FlatList
      horizontal={true}
      data={books}
      renderItem={(book) => <BookComp {...book.item} />}
      showsHorizontalScrollIndicator={false}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    height: 150,
    paddingTop: 20,
  },
});

export default Books;
