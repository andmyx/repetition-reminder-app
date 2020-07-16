import React from "react";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    body: {

    },
    tags: {
        flexDirection: "row",
        justifyContent: "flex-end",
        flexWrap: "wrap",
    },
    tagsText: {
        marginRight: 2
    }
});

export default globalStyles;