import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, FlatList, TouchableOpacity, RecyclerViewBackedScrollViewComponent } from "react-native";
import { Formik } from "formik";

import { HeaderBackButton } from "@react-navigation/stack";

import { newTagDBHandler, loadTagsFromDB } from "../../database/database";

import Card from "../../shared/card";

import { Ionicons } from "@expo/vector-icons";

export default function ReminderCreate({ route, navigation }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filter, setFilter] = useState("");

  // this only runs once
  React.useEffect(() => {
    loadTagsFromDB(setTags, setSelectedTags, route.params.tags);
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

  function onChangeTextHandler(text) {
    setFilter(text);
  }

  function markTagAsSelected(item) {
    // add item to selectedTags
    setSelectedTags([...selectedTags, item]);

    // remove item from tags
    let tagsCopy = [...tags];
    let index = tagsCopy.map(tag => tag.id).indexOf(item.id);

    tagsCopy.splice(index, 1);

    setTags(tagsCopy);
  }

  function unMarkTagAsSelected(item) {
    // add item to tags
    setTags([...tags, item]);
    // sort the tags-list here?

    // remove item from selectedTags
    let selectedTagsCopy = [...selectedTags];
    let index = selectedTagsCopy.map(tag => tag.name).indexOf(item.name);

    selectedTagsCopy.splice(index, 1);

    setSelectedTags(selectedTagsCopy);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text>This is the tag-create screen</Text>

        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, FormikBag) => {
            if (values.name != "") {
              // creates the new tag if it doesn't already exist 
              // and adds it to selectedTags
              newTagDBHandler(setTags, setSelectedTags, values.name, selectedTags);

              // clear the input-field
              FormikBag.resetForm();

              // reset filter as the input field has been reset
              setFilter("");
            }
          }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Add a tag..."
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
                onChange={(values) => {
                  // update filter as the text in the 
                  // input-box has changed
                  onChangeTextHandler(values.nativeEvent.text);
                }}
              />

              <Button title="Submit" onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>

        <View style={styles.selectedTagsFlatlist}>
          <FlatList
            data={selectedTags}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => unMarkTagAsSelected(item)}>
                  <Card cardStyle={{ backgroundColor: "#00f000" }} contentStyle={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <Ionicons name={"ios-checkbox-outline"} size={20} style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: 15 }}>{item.name}</Text>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <View style={styles.tagsFlatlist}>
          <FlatList
            // if the input field is empty 
            // all tags should be shown (filter evaluates to false)
            // if something has been written in the input field
            // then only the tags that include what has been written in 
            // the input field should be shown
            data={filter ? tags.filter(tag => (tag.name.toLowerCase().includes(filter.toLowerCase()))) : tags}
            renderItem={({ item }) => {

              return (
                <TouchableOpacity onPress={() => markTagAsSelected(item)}>
                  <Card contentStyle={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <Ionicons name={"ios-square-outline"} size={20} style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: 15 }}>{item.name}</Text>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>

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
  },
  selectedTagsFlatlist: {
    marginVertical: 10
  },
  tagsFlatlist: {
    paddingBottom: 110,
  },
});
