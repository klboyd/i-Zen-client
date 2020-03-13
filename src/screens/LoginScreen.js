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
import { login } from "../APIManager";

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
      <View style={styles.usernameContainer}>
        {/* <Text style={styles.usernameLabel}>Username: </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.passwordContainer}>
        {/* <Text style={styles.usernameLabel}>Username: </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button title="Login" onPress={loginHandler} />
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
  }
});

export default LoginScreen;
