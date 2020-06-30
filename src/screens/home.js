import React, { useState } from "react";
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import { AppLoading } from "expo";

import Card from "../shared/card";

import globalStyles from "../styles/globalStyles";

const db = SQLite.openDatabase("bana.db");

function createDB() {
  // Create reminders table
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists reminders (id integer primary key not null, subject text, title text, body text, tags text);"
    );
  })
  // Create tags table
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists tags (id integer primary key not null, name text);"
    );
  })
}

export default function Home({ route, navigation }) {
  const [reminders, setReminders] = useState([]);
  const [dbCreated, setdbCreated] = useState(false);

  React.useEffect(() => {
    if (route.params?.values) {
      addReminder(route.params.values);
    }
  }, [route.params?.values]);


  function addReminder(values) {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into reminders (subject, title, body, tags) values (?, ?, ?, ?)",
          [values.subject, values.title, values.body, values.tags]
        );
      }
    )
  }

  function loadDB() {
    db.transaction(
      tx => {
        tx.executeSql(
          "select * from reminders",
          [],
          (_, { rows: { _array } }) => {
            setReminders(_array.reverse());
          }
        );
      }
    )
  }

  function goToReminderCreate() {
    navigation.push("ReminderCreate");
  }

  function flatListItem(subject, title, body) {
    return (
      <Card>
        <Text style={globalStyles.title}>{title}</Text>
        <Text style={globalStyles.subject}>{subject}</Text>
        <Text style={globalStyles.body}>{body}</Text>
      </Card>
    );
  }

  function inspectReminder(index) {
    navigation.navigate("InspectReminder", { values: reminders[index] })
  }
  if (dbCreated) {

    loadDB();

    return (
      <View style={styles.container}>
        <Text>This is the homescreen</Text>
        <Button title="Create a reminder" onPress={goToReminderCreate} />
        <FlatList
          data={reminders}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => inspectReminder(index)}>
              {flatListItem(item.subject, item.title, item.body)}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={createDB}
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
