import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from "./stacknavigation/homestack";
import FileSystemStack from "./stacknavigation/filesystemstack";
import AboutStack from "./stacknavigation/aboutstack";

const Tab = createBottomTabNavigator();

export default function drawerNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Filesystem" component={FileSystemStack} />
        <Tab.Screen name="About" component={AboutStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
