import React from "react";
import { Text, View } from "react-native";

import Card from "../shared/card";

import globalStyles from "../styles/globalStyles";

export default function inspectReminder({ route, navigation }) {
    let tags = JSON.parse(route.params.values.tags);

    let tagsTextList = tags.map((tag) =>
        <Text key={tag.id} style={globalStyles.tagsText} > {tag.name},</ Text>
    );
    ;

    return (
        <Card>
            <Text style={globalStyles.title}>{route.params.values.title}</Text>
            <Text style={globalStyles.body}>{route.params.values.body}</Text>
            <View style={globalStyles.tags}>
                <Text style={globalStyles.tagsText}>Tags:</Text>
                {tagsTextList}
            </View>
            <Text style={globalStyles.body}>{new Date(route.params.values.creationtime).toString()}</Text>
        </Card>
    );
}