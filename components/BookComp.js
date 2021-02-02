import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const BookComp = ({ author, title, imageUrl }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookComp;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: 150,
    height: 270,
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    marginHorizontal: 13,
  },
  imageContainer: {
    flex: 6,
  },
  descContainer: {
    flex: 1,
    marginTop: 7,
    marginBottom: 3,
    marginLeft: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
  },
  author: {
    fontSize: 14,
    textAlign: "left",
  },
});
