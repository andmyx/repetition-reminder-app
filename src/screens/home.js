import React, { useState } from "react";
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import { AppLoading } from "expo";

const db = SQLite.openDatabase("banan.db");

function createDB() {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists reminders (id integer primary key not null, subject text, title text, body text);"
    );
  })
}

export default function Home({ route, navigation }) {
  const [reminders, setReminders] = useState([]);
  const [dbCreated, setdbCreated] = useState(false);

  React.useEffect(() => {
    if (route.params?.values) {
      addReview(route.params.values);
    }
  }, [route.params?.values]);


  function addReview(values) {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into reminders (subject, title, body) values (?, ?, ?)",
          [values.subject, values.title, values.body]
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

  function flatListItem(title) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{title}</Text>
      </View>
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
              {flatListItem(item.title)}
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
    color: "#ff0000",
  }
});
