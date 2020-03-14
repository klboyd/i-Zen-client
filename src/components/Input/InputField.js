import React from "react";
import { StyleSheet, TextInput, ShadowPropTypesIOS } from "react-native";

const InputField = props => {
  return (
    <TextInput style={{ ...styles.input, ...props.style }} {...props}>
      {props.children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center"
  }
});

export default InputField;
