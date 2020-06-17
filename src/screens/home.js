import React from "react";
import { StyleSheet, View, Text, Button} from "react-native";

export default function Home({ navigation }) {

  function goToReminderCreate() {
    navigation.push("ReminderCreate")
  }

  return (
    <View style={styles.container}>
      <Text>This is the homescreen</Text>
      <Button title="Create a reminder" onPress={goToReminderCreate}/>
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
