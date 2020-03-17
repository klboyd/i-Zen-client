// modal container for forms

import React from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

const FormModalContainer = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isFormVisible}>
      <View style={{ ...styles.formContent, ...props.style }}>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  formContent: {
    marginVertical: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FormModalContainer;
