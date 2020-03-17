// input field container for consistent styling

import React from "react";
import { StyleSheet, View, Text } from "react-native";

import InputField from "./InputField";

const InputFieldContainer = props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <InputField {...props}>{props.children}</InputField>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  }
});

export default InputFieldContainer;
