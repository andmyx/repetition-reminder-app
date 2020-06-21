import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";

export default function ReminderCreate({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text>This is the reminder-create screen</Text>
      <Formik
        initialValues={{ subject: "", title: "", body: "" }}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate("Home", { values: values });
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Subject"
              onChangeText={formikProps.handleChange("subject")}
              value={formikProps.values.subject}
            />
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

            <Button title="Submit" onPress={formikProps.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
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
