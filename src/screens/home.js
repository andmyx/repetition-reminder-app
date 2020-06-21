import React, { useState } from "react";
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from "react-native";

export default function Home({ route, navigation }) {
  const [reminders, setReminders] = useState([
    { subject: "subject1", title: "title1", body: "body1", key: "1" },
    { subject: "subject2", title: "title2", body: "body2", key: "2" },
    { subject: "subject3", title: "title3", body: "body3", key: "3" },
  ]);

  React.useEffect(() => {
    if (route.params?.values) {
      addReview(route.params.values);
    }
  }, [route.params?.values]);

  function addReview(values) {
    values.key = Math.random().toString();
    setReminders((currentReminders) => {
      return [values, ...currentReminders];
    })
  }

  function goToReminderCreate() {
    navigation.push("ReminderCreate");
  }

  function flatListItem(title) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>This is the homescreen</Text>
      <Button title="Create a reminder" onPress={goToReminderCreate} />
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <TouchableOpacity>
            {flatListItem(item.title)}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00f000",
    padding: 30,
  },
  item: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    padding: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ff0000",
  }
});
