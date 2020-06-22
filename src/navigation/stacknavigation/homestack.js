import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyles from "./stackheaderstyle";

import Home from "../../screens/home";
import ReminderCreate from "../../screens/reminderCreate";
import inspectReminder from "../../screens/inspectReminder";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={StackHeaderStyles}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home Screen"
        }} />
      <Stack.Screen
        name="ReminderCreate"
        component={ReminderCreate}
        options={{
          title: "ReminderCreate Screen"
        }} />
      <Stack.Screen
        name="InspectReminder"
        component={inspectReminder}
        options={{
          title: "InspectReminder screen"
        }} />
    </Stack.Navigator>
  );
}
