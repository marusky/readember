import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import BookCard from "./BookCard";
import * as FileSystem from "expo-file-system";
import { fetchBooks } from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Books = ({ fetchBooks, books }) => {
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

const mapStateToProps = (store) => ({
  books: store.booksState.books,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchBooks }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Books);
