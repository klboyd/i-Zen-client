import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../modules/Colors";
import ZenButton from "../ButtonComponent/ZenButton";

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
  }
});

export default AddButton;
