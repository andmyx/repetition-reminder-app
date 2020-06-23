import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from "./stacknavigation/homestack";
import FileSystemStack from "./stacknavigation/filesystemstack";
import AboutStack from "./stacknavigation/aboutstack";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function drawerNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? "ios-home" : "md-home";
            } else if (route.name === "About") {
              iconName = focused ? "ios-information-circle-outline" : "ios-information-circle";
            } else if (route.name === "Filesystem") {
              iconName = focused ? "md-folder-open" : "md-folder";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="About" component={AboutStack} />
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Filesystem" component={FileSystemStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
