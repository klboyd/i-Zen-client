import React, { useState } from "react";
import {
  StyleSheet,
  AsyncStorage,
  View,
  Text,
  TextInput,
  Alert,
  Button
} from "react-native";
import { login } from "../modules/APIManager";
import Colors from "../modules/Colors";

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
    <View style={{ ...styles.screen, ...props.style }}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeMessage}>Welcome to i-Zen!</Text>
        <Text style={styles.welcomeMessage}>Please log in</Text>
      </View>
      <View style={styles.usernameContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.loginButton}
          color={Colors.primary}
          // color="#464bb4"
          title="Login"
          onPress={loginHandler}
        />
        <Text style={styles.buttonChoiceText}>or</Text>
        <Button
          style={styles.registerButton}
          color={Colors.secondary}
          // color="#46b4af"
          title="Register"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  welcomeMessage: {
    fontSize: 30
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  usernameLabel: {
    // height: "100%"
  },
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "center",
    width: "80%",
    marginTop: 20
  },
  buttonChoiceText: {
    fontSize: 20,
    marginVertical: 20
  },
  loginButton: {
    fontWeight: "bold"
  },
  registerButton: {
    color: "#46b4af"
  }
});

export default LoginScreen;
