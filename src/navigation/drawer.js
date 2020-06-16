import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./stacknavigation/homestack";
import FileSystemStack from "./stacknavigation/filesystemstack";
import AboutStack from "./stacknavigation/aboutstack";

const Drawer = createDrawerNavigator();

export default function drawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Filesystem" component={FileSystemStack} />
        <Drawer.Screen name="About" component={AboutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}