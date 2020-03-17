import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage, Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "./src/components/Header/HeaderButton";

import Colors from "./src/modules/Colors";
import { logout } from "./src/modules/APIManager";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProgressionScreen from "./src/screens/ProgressionScreen";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutHandler = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("iZen-token");
      token && setIsAuthenticated(true);
    };
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              options={{
                headerStyle: styles.headerStyle,
                headerTitleAlign: "center"
              }}>
              {props => (
                <LoginScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{
                headerStyle: styles.headerStyle,
                headerTitleAlign: "center"
              }}>
              {props => (
                <RegisterScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen
            name="iZen"
            options={{
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
              headerLeft: () => (
                <HeaderButton title="Logout" onPress={logoutHandler} />
              ),
              headerRight: () => (
                <Ionicons
                  style={{ paddingHorizontal: 20 }}
                  name="md-person"
                  size={32}
                  color="black"
                />
              )
            }}>
            {props => <ProgressionScreen {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    height: 100,
    backgroundColor: Colors.light.background.header
  },
  headerTitleStyle: {
    color: "#000"
  }
});
