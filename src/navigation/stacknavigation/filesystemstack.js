import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyle from "./stackheaderstyle";

import Header from "../../shared/header";

import FileSystem from "../../screens/filesystem";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Filesystem"
      screenOptions={StackHeaderStyle}>
      <Stack.Screen
        name="Filesystem"
        component={FileSystem}
        options={{ headerTitle: () => <Header text="Filesystem Screen" /> }} />
    </Stack.Navigator>
  );
}