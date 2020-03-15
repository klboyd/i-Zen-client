import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import InputFieldContainer from "../components/Input/InputFieldContainer";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import Colors from "../modules/Colors";
import { register } from "../modules/APIManager";

const RegisterScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const registerNewUserHandler = async () => {
    if (password === verifyPassword) {
      const response = await register({
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname
      });
      if (await AsyncStorage.getItem("iZen-token")) {
        await props.setIsAuthenticated(true);
      }
    } else {
      Alert.alert("Passwords do not match.");
    }
  };

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <Text style={styles.registerMessage}>Register a new Account</Text>
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

      <InputFieldContainer
        placeholder="Verify Password"
        required
        value={verifyPassword}
        secureTextEntry={true}
        onChangeText={text => setVerifyPassword(text)}
      />
      <InputFieldContainer
        placeholder="First name (optional)"
        value={firstname}
        onChangeText={text => setFirstname(text)}
      />
      <InputFieldContainer
        placeholder="Last name (optional)"
        value={lastname}
        onChangeText={text => setLastname(text)}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color={Colors.light.background.secondary}
          onPress={registerNewUserHandler}
          title="Register"
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  registerMessage: {
    fontSize: 30,
    marginBottom: 20
  },
  inputContainer: {
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
  }
});

export default RegisterScreen;
