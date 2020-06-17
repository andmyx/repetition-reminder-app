import React, { version } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Dimensions } from "react-native";

export default function Header({ text }) {

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00f0f0",
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    letterSpacing: 1,
  },
})
