import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { firestore } from "../config";
import { useGlobalContext } from "../context";
import BookCard from "./BookCard";
import * as FileSystem from "expo-file-system";

const Books = () => {
  const { userID, update } = useGlobalContext();
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

  // const fetchBooksLocal = async () => {
  //   const books = []
  //   const loadImage = async () => {
  //     const imageInfo = await FileSystem.getInfoAsync(
  //       FileSystem.documentDirectory + "image01.jpg"
  //     );
  //     setTest(imageInfo.uri);
  //   };

  // }

  useEffect(() => {
    fetchBooks();
  }, [update]);
  //   nech sa to update-ne ked pridam knihu :D
  return (
    <FlatList
      horizontal={true}
      data={books}
      renderItem={(book) => <BookCard {...book.item} />}
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
