import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BaseRouter } from "@react-navigation/native";

import Card from "../shared/card";

import globalStyles from "../styles/globalStyles";

export default function inspectReminder({ route, navigation }) {
    return (
        <Card>
            <Text style={globalStyles.title}>{route.params.values.title}</Text>
            <Text style={globalStyles.subject}>{route.params.values.subject}</Text>
            <Text style={globalStyles.body}>{route.params.values.body}</Text>
        </Card>
    );
}