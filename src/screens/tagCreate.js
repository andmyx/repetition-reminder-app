import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, FlatList } from "react-native";
import { Formik } from "formik";

import { addTagsToDB, loadTagsFromDB } from "../database/database";

export default function ReminderCreate({ route, navigation }) {
  const [tags, setTags] = useState([]);

  function onSubmitHandler(values) {
    addTagsToDB(values);
    navigation.navigate("ReminderCreate")
  }

  loadTagsFromDB(setTags);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>This is the tag-create screen</Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Add a tag..."
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
              />

              <Button title="Submit" onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
        <FlatList
          data={tags}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
  }
});
