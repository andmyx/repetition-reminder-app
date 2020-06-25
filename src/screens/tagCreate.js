import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";

export default function ReminderCreate({ route, navigation }) {
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>This is the tag-create screen</Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            navigation.navigate("ReminderCreate", { values: values });
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
