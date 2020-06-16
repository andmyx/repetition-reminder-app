import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyle from "./stackheaderstyle";

import Header from "../../shared/header";

import About from "../../screens/about";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={StackHeaderStyle}>
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerTitle: () => <Header text="About Screen" /> }} />
    </Stack.Navigator>
  );
}