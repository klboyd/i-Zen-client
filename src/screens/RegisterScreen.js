import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import InputField from "../components/Input/InputField";
import InputFieldContainer from "../components/Input/InputFieldContainer";
import Screen from "../components/ScreenComponent/ScreenContainer";

const RegisterScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <Screen style={{ ...styles.screen, ...props.style }}>
      <Text style={styles.registerMessage}>Register a new Account</Text>
      <InputFieldContainer
        placeholder="Username"
        value={username}
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
        value={verifyPassword}
        secureTextEntry={true}
        onChangeText={text => setVerifyPassword(text)}
      />
      <TextInput />
      <TextInput />
    </Screen>
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
