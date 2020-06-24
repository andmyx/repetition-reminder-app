import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#ffffff",
        shadowOffset: { width: -5, height: 3 },
        shadowColor: "#333333",
        shadowOpacity: 0.4,
        shadowRadius: 1,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 13,
    },
})