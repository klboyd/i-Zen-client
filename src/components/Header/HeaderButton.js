import React from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import Colors from "../../modules/Colors";

const HeaderButton = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.headerButton, ...props.style }}
      {...props}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    height: 30,
    width: 60,
    margin: 5,
    marginLeft: 20,
    backgroundColor: Colors.header,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#333333",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    padding: 3,
    fontSize: 14,
    color: "white"
  }
});

export default HeaderButton;
