import React from "react";
import { Text, View, Button } from "react-native";

import Card from "../shared/card";

import { deleteReminderFromDB } from "../database/database";

import globalStyles from "../styles/globalStyles";

export default function inspectReminder({ route, navigation }) {
    let tags = JSON.parse(route.params.values.tags);

    let tagsTextList = tags.map((tag) =>
        <Text key={tag.id} style={globalStyles.tagsText} > {tag.name},</ Text>
    );
    ;

    function deleteReminder() {
        deleteReminderFromDB(route.params.values);

        navigation.navigate("Home", { deletedReminderID: route.params.values.id });
    }

    return (
        <View>
            <Card>
                <Text style={globalStyles.title}>{route.params.values.title}</Text>
                <Text style={globalStyles.body}>{route.params.values.body}</Text>
                <View style={globalStyles.tags}>
                    <Text style={globalStyles.tagsText}>Tags:</Text>
                    {tagsTextList}
                </View>
                <Text style={globalStyles.body}>{new Date(route.params.values.creationtime).toString()}</Text>
            </Card>
            <Button title="Delete Reminder" onPress={deleteReminder} />
        </View>
    );
}