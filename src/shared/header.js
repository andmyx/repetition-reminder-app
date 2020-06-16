import React, { version } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { Dimensions } from "react-native";

export default function Header({ text }) {

  const navigation = useNavigation();

  function openMenu() {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name="menu" size={28} onPress={openMenu} style={styles.icon} />
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
  icon: {
    position: "absolute",
    left: 16,
  }
})