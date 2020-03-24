import React from "react";
import { StyleSheet, Text } from "react-native";

import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";

const AddButton = props => {
  return (
    <ZenButton
      customStyle={{ backgroundColor: Colors.light.button.primary }}
      {...props}>
      <Text style={styles.buttonText}>Add</Text>
    </ZenButton>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    padding: 3,
    fontSize: 14,
    color: "white"
  },
  buttonText: {
    color: Colors.light.text.primary
  }
});

export default AddButton;
