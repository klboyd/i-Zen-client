import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "./src/components/Header/Header";
import Content from "./src/components/Content";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Header /> */}
    //   <Content />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center"
            // headerTitleStyle: styles.headerTitleStyle
            // headerTitle: props => <Header {...props} />,
            // headerLeft: () => (
            //   <Button
            //     onPress={() => alert("This is a button!")}
            //     title="Back"
            //     color="#000"
            //   />
            // )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
    backgroundColor: "#4682b4aa"
  },
  headerTitleStyle: {
    color: "#000"
  }
});
