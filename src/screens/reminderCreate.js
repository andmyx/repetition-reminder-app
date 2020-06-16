import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ReminderCreate() {
  return (
    <View style={styles.container}>
      <Text>This is the reminder-create screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff00ff",
    padding: 30,
  },
});
