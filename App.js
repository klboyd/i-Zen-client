import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage, Text, View, Button } from "react-native";
import Header from "./src/components/Header/Header";
import Content from "./src/components/Content";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import { logout } from "./src/APIManager";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutHandler = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      // await AsyncStorage.removeItem("iZen-token");
      const token = await AsyncStorage.getItem("iZen-token");
      token && setIsAuthenticated(true);
    };
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            options={{
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center"
            }}>
            {props => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Header" component={Header} />
        )}
      </Stack.Navigator>
      <Button title="logout" onPress={logoutHandler} />
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
