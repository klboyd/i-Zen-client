import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../modules/Colors";
import ZenButton from "../ButtonComponent/ZenButton";

const HeaderButton = props => {
  return (
    <ZenButton
      customStyle={{ backgroundColor: Colors.light.button.secondary }}
      {...props}>
      <Text style={styles.buttonText}>Logout</Text>
    </ZenButton>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    padding: 3,
    fontSize: 14,
    color: Colors.light.text.primary
  }
});

export default HeaderButton;
