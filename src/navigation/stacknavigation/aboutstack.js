import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../../screens/about";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}