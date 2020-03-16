import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../modules/Colors";
import { login } from "../modules/APIManager";
import InputFieldContainer from "../components/Input/InputFieldContainer";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

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
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
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
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.secondary }}
          onPress={() => props.navigation.navigate("Register")}>
          <Text>Register</Text>
        </ZenButton>
        <Text style={styles.buttonChoiceText}>or</Text>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={loginHandler}>
          <Text>Login</Text>
        </ZenButton>
      </View>
    </ScreenContainer>
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
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "80%",
    marginTop: 20
  },
  buttonChoiceText: {
    fontSize: 20,
    marginVertical: 20
  }
});

export default LoginScreen;
