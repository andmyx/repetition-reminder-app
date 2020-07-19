import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyles from "./stackheaderstyle";

import Home from "../../screens/homeStackScreens/home";
import ReminderCreate from "../../screens/homeStackScreens/reminderCreate";
import inspectReminder from "../../screens/homeStackScreens/inspectReminder";
import tagCreate from "../../screens/homeStackScreens/tagCreate";

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
        name="TagCreate"
        component={tagCreate}
        options={{
          title: "TagCreate Screen"
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
