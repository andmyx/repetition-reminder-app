import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StackHeaderStyle from "./stackheaderstyle";

import About from "../../screens/aboutStackScreens/about";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={StackHeaderStyle}>
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "About Screen"
        }} />
    </Stack.Navigator>
  );
}