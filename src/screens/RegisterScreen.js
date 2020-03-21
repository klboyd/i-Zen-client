import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Alert, AsyncStorage } from "react-native";

import InputFieldContainer from "../components/Input/InputFieldContainer";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";

import Colors from "../modules/Colors";
import { register } from "../modules/APIManager";
import ZenButton from "../components/ButtonComponent/ZenButton";

const RegisterScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const registerNewUserHandler = async () => {
    if (username === "") {
      Alert.alert("Please enter a username");
    } else if (password === "") {
      Alert.alert("Please enter a password");
    } else {
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
    }
  };

  const passwordRef = useRef();
  const validatePasswordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <Text style={styles.registerMessage}>Register a new Account</Text>
      <InputFieldContainer
        autoFocus={true}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        placeholder="Username"
        required
        value={username}
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
      />
      <InputFieldContainer
        setRef={input => (passwordRef.current = input)}
        returnKeyType="next"
        onSubmitEditing={() => validatePasswordRef.current.focus()}
        placeholder="Password"
        required
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <InputFieldContainer
        setRef={input => (validatePasswordRef.current = input)}
        returnKeyType="next"
        onSubmitEditing={() => firstnameRef.current.focus()}
        placeholder="Verify Password"
        required
        value={verifyPassword}
        secureTextEntry={true}
        onChangeText={text => setVerifyPassword(text)}
      />
      <InputFieldContainer
        setRef={input => (firstnameRef.current = input)}
        returnKeyType="next"
        onSubmitEditing={() => lastnameRef.current.focus()}
        placeholder="First name (optional)"
        value={firstname}
        onChangeText={text => setFirstname(text)}
      />
      <InputFieldContainer
        setRef={input => (lastnameRef.current = input)}
        returnKeyType="done"
        onSubmitEditing={registerNewUserHandler}
        placeholder="Last name (optional)"
        value={lastname}
        onChangeText={text => setLastname(text)}
      />
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={styles.button}
          color={Colors.light.button.secondary}
          onPress={registerNewUserHandler}
          title="Register">
          <Text>Register</Text>
        </ZenButton>
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
  },
  button: {
    backgroundColor: Colors.light.button.primary
  }
});

export default RegisterScreen;
