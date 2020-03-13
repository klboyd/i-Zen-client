import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";

const Content = props => {
  return (
    <View style={{ ...styles.content, ...props.style }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  content: {
    width: "100%"
  }
});

export default Content;
