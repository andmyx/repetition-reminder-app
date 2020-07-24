import React, { useState } from "react";
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";

import { createDB, loadRemindersFromDB } from "../../database/database";

import Card from "../../shared/card";

import globalStyles from "../../styles/globalStyles";

export default function Home({ route, navigation }) {
  const [reminders, setReminders] = useState([]);
  const [dbCreated, setdbCreated] = useState(false);

  React.useEffect(() => {
    loadRemindersFromDB(setReminders);
  }, [route.params?.loadReminders]);

  // a reminder has been deleted in inspectReminder
  // and reminders should be loaded again
  React.useEffect(() => {
    if (route.params?.deletedReminderID) {
      loadRemindersFromDB(setReminders);
    }
  }, [route.params?.deletedReminderID])

  function createAndLoadDB() {
    createDB();
    loadRemindersFromDB(setReminders);
  }

  function goToReminderCreate() {
    navigation.push("ReminderCreate");
  }

  function flatListItem(title, body, tags) {
    return (
      <Card>
        <Text style={globalStyles.title}>{title}</Text>
        <Text style={globalStyles.body}>{body}</Text>
        <View style={globalStyles.tags}>
          <Text style={globalStyles.tagsText}>Tags: {tags}</Text>
        </View>
      </Card>
    );
  }

  function inspectReminder(index) {
    navigation.navigate("InspectReminder", { values: reminders[index] })
  }
  if (dbCreated) {

    return (
      <View style={styles.container}>
        <Text>This is the homescreen</Text>
        <Button title="Create a reminder" onPress={goToReminderCreate} />
        <FlatList
          data={reminders}
          renderItem={({ item, index }) => {

            return (
              <TouchableOpacity onPress={() => inspectReminder(index)}>
                {flatListItem(item.title, item.body, item.tags)}
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={createAndLoadDB}
        onFinish={() => setdbCreated(true)}
      />
    );
  }
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
    color: "#333333",
  },
});
