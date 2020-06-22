import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BaseRouter } from "@react-navigation/native";

export default function inspectReminder({ route, navigation }) {
    return (
        <View>
            <Text>{route.params.values.subject}</Text>
            <Text>{route.params.values.title}</Text>
            <Text>{route.params.values.body}</Text>
        </View>
    );
}