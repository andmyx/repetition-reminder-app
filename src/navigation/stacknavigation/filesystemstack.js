import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FileSystem from "../../screens/filesystem";

const Stack = createStackNavigator();

export default function homeStack() {
  return (
    <Stack.Navigator initialRouteName="Filesystem">
      <Stack.Screen name="Filesystem" component={FileSystem} />
    </Stack.Navigator>
  );
}