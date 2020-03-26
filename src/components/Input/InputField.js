// input field template for consistent styling

import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = props => {
  return (
    <TextInput
      ref={props.setRef}
      placeholderTextColor="grey"
      style={{ ...styles.input, ...props.inputStyle }}
      {...props}>
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
    textAlign: "center",
    color: "black"
  }
});

export default InputField;
