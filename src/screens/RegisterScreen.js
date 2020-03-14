import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import InputField from "../components/Input/InputField";
import InputFieldContainer from "../components/Input/InputFieldContainer";

const RegisterScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <View styles={{ ...styles.screen, ...props.style }}>
      <Text>RegisterScreen</Text>
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

      <TextInput />
      <TextInput />
      <TextInput />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    alignItems: "center"
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
