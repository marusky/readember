import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../context";

const Timer = ({ isPlaying, bookID, isStopped }) => {
  const { setReadingTimeState } = useGlobalContext();
  const [readingTime, setReadingTime] = useState(0);
  useEffect(() => {
    if (isStopped) {
      console.log("reading time:", readingTime);
    } else if (isPlaying) {
      const timer = setInterval(() => {
        setReadingTime(readingTime + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  });
  return (
    <View>
      <Text style={styles.time}>
        {Math.floor(readingTime / 60)}:
        {readingTime % 60 > 9 ? readingTime % 60 : `0${readingTime % 60}`}
      </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  time: {
    color: "white",
    fontSize: 30,
  },
});
