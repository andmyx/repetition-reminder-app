import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, FlatList, TouchableOpacity, RecyclerViewBackedScrollViewComponent } from "react-native";
import { Formik } from "formik";

import { HeaderBackButton } from "@react-navigation/stack";

import { addTagsToDB, loadTagsFromDB } from "../database/database";

import Card from "../shared/card";

import { Ionicons } from "@expo/vector-icons";

export default function ReminderCreate({ route, navigation }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // this only runs once
  React.useEffect(() => {
    loadTagsFromDB(setTags);

    // this evaluates to true 
    // if the user re-enters the tagCreate-screen
    if (route.params?.tags) {
      // toggle all the previously selected tags 
      // so that they are selected
      setSelectedTags(route.params.tags);
    }
  }, []);

  // modify upper left back-button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => { navigation.navigate("ReminderCreate", { tags: selectedTags }) }}
          tintColor="#333333" />
      )
    })
  })

  function onSubmitHandler(values) {
    addTagsToDB(values);

    // load tags again as new tags has been added to the database
    loadTagsFromDB(setTags);
  }

  function toggleTagSelect(item, selected) {
    if (selected) {
      // remove item from selectedTags
      let selectedTagsCopy = [...selectedTags];
      let index = selectedTagsCopy.map(tag => tag.name).indexOf(item.name);

      selectedTagsCopy.splice(index, 1);

      setSelectedTags(selectedTagsCopy);

      return false;
    } else {
      // add item to selectedTags
      setSelectedTags([...selectedTags, item]);

      return true;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>This is the tag-create screen</Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, FormikBag) => {
            onSubmitHandler(values);

            FormikBag.resetForm();
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
          renderItem={({ item }) => {

            // check if the tag already exists in selectedTags
            // this is done here to avoid having to execute the same line
            // twice, once in toggleTagSelect and once to determine which
            // icon to use
            // CHANGE to use .key instead of .name?
            let selected = selectedTags.map(tag => tag.name).includes(item.name);

            return (
              <TouchableOpacity onPress={() => toggleTagSelect(item, selected)}>
                <Card contentStyle={{ flexDirection: "row", marginHorizontal: 10 }}>
                  <Ionicons name={selected ? "ios-checkbox-outline" : "ios-square-outline"} size={20} style={{ marginRight: 10 }} />
                  <Text style={{ fontSize: 15 }}>{item.name}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
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
