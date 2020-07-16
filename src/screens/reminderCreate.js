import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";

import globalStyles from "../styles/globalStyles";

export default function ReminderCreate({ route, navigation }) {
  const [tags, setTags] = useState([]);
  const [tagsTextList, setTagsTextList] = useState([]);

  React.useEffect(() => {
    if (route.params?.tags) {
      setTags(route.params.tags);
    }
  }, [route.params?.tags]);

  React.useEffect(() => {
    setTagsTextList(tags.map((tag) =>
      <Text key={tag.id} style={globalStyles.tagsText} > {tag.name},</ Text>
    )
    )
  }, [tags])

  function renderTags() {
    if (tagsTextList.length > 0) {
      return tagsTextList;
    } else {
      return <Text style={globalStyles.tagsText}>No tags selected</Text>
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>This is the reminder-create screen</Text>
        <Formik
          initialValues={{ title: "", body: "" }}
          onSubmit={(values) => {
            // the creation time could be calculated in the home-screen
            // instead of being calculated here and then passed to the home-screen
            // but it is done here to ease the implementation of a future
            // feature where a user can manually select the creation date
            // of their reminder
            let creationTime = Date.now(); // this is unix time in miliseconds

            navigation.navigate("Home", { values: { ...values, tags, creationTime } });
          }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={formikProps.handleChange("title")}
                value={formikProps.values.title}
              />
              <TextInput
                style={styles.input}
                placeholder="Body"
                onChangeText={formikProps.handleChange("body")}
                value={formikProps.values.body}
                multiline
              />

              <View style={{ ...globalStyles.tags, justifyContent: "flex-start", marginTop: 10 }}>
                <Text style={globalStyles.tagsText}>Tags:</Text>
                {renderTags()}
              </View>

              <Button title="Add tags" onPress={() => navigation.navigate("TagCreate", { tags: tags })} />

              <Button title="Submit" onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
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
