import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../modules/Colors";

const ZenButton = ({ customStyle, ...props }) => {
  let buttonStyle = [];
  buttonStyle = buttonStyle.concat(styles.zenButton);

  buttonStyle = customStyle ? buttonStyle.concat(customStyle) : buttonStyle;

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  zenButton: {
    height: 30,
    paddingHorizontal: 8,
    maxWidth: 120,
    margin: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background.header,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#333333",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    padding: 3,
    fontSize: 14,
    color: "white"
  }
});

export default ZenButton;
