import React from "react";
import { styleSheet, View, Text } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>This is the homescreen</Text>
        </View>
    );
}

const styles = styleSheet.create({
    container: {
        flex: 1,
        backgroundcolor: "#ff00ff",
    },
});