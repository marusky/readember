import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firestore } from "../config";
import { useGlobalContext } from "../context";

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
    <View>
      {books.map((book) => (
        <Text key={book.id}>{book.title}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Books;
