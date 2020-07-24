import React from "react";
import { Text, View, Button } from "react-native";

import Card from "../../shared/card";

import { deleteReminderFromDB } from "../../database/database";

import globalStyles from "../../styles/globalStyles";

export default function inspectReminder({ route, navigation }) {
    function deleteReminder() {
        deleteReminderFromDB(route.params.values);

        navigation.navigate("Home", { deletedReminderID: route.params.values.id });
    }

    return (
        <View>
            <Card>
                <Text style={globalStyles.title}>{route.params.values.title}</Text>
                <Text style={globalStyles.body}>{route.params.values.body}</Text>
                <Text style={globalStyles.body}>{new Date(route.params.values.creationtime).toString()}</Text>
                <View style={globalStyles.tags}>
                    <Text style={globalStyles.tagsText}>Tags: {route.params.values.tags}</Text>
                </View>
            </Card>
            <Button title="Delete Reminder" onPress={deleteReminder} />
        </View>
    );
}