import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Admin from "../features/Admin/Admin";
import TodoList from "../features/TodoList/TodoList";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="TodoList">
        <Tab.Screen name="TodoList" component={TodoList} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
