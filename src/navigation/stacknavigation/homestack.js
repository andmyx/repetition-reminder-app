import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/home";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}