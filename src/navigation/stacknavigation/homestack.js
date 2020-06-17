import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyles from "./stackheaderstyle";

import Header from "../../shared/header";

import Home from "../../screens/home";
import ReminderCreate from "../../screens/reminderCreate";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={StackHeaderStyles}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: () => <Header text="Home Screen" /> }} />
      <Stack.Screen
        name="ReminderCreate"
        component={ReminderCreate}/>
    </Stack.Navigator>
  );
}
