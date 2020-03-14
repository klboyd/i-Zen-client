import React, { useState } from "react";
import {
  StyleSheet,
  AsyncStorage,
  View,
  Text,
  TextInput,
  Alert,
  Button,
  TouchableOpacity
} from "react-native";
import { login } from "../modules/APIManager";
import Colors from "../modules/Colors";
import InputFieldContainer from "../components/Input/InputFieldContainer";
import Screen from "../components/ScreenComponent/ScreenContainer";

const LoginScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const response = await login({
      username: username,
      password: password
    });

    response && props.setIsAuthenticated(true);
  };

  return (
    <Screen style={{ ...styles.screen, ...props.style }}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeMessage}>Welcome to i-Zen!</Text>
        <Text style={styles.welcomeMessage}>Please log in</Text>
      </View>
      <InputFieldContainer
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
      />
      <InputFieldContainer
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          color={Colors.primary}
          // color="#464bb4"
          onPress={loginHandler}>
          <Text>Login</Text>
        </TouchableOpacity>
        <Text style={styles.buttonChoiceText}>or</Text>
        <TouchableOpacity
          style={styles.button}
          color="red"
          onPress={() => props.navigation.navigate("Register")}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  welcomeMessage: {
    fontSize: 30
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    // width: "80%",
    marginTop: 20
  },
  buttonChoiceText: {
    fontSize: 20,
    marginVertical: 20
  },
  button: {}
});

export default LoginScreen;
