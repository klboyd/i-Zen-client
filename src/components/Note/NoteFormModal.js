// form modal for creating a note

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { postItem } from "../../modules/APIManager";

const NoteFormModal = props => {
  const [description, setDescription] = useState("");

  const cancelFormHandler = () => {
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (description === "") {
      Alert.alert("Description cannot be blank");
    } else {
      await postItem("notes", {
        description: description,
        board_id: props.boardDetails.id
      });
      setDescription("");
      props.onConfirm();
    }
  };

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isFormVisible}>
      <Text style={styles.formModalHeader}>Add New Note</Text>
      <View style={styles.formContainer}>
        <Text>{props.boardDetails.name}</Text>
        <InputFieldContainer
          inputStyle={styles.inputField}
          placeholder={`Enter something ${props.boardDetails.type}!`}
          value={description}
          // autoCapitalize="none"
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.secondary }}
          onPress={cancelFormHandler}>
          <Text>Cancel</Text>
        </ZenButton>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={confirmFormHandler}>
          <Text>Add</Text>
        </ZenButton>
      </View>
    </FormModalContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "flex-start"
  },
  formModalHeader: {
    fontSize: 22,
    marginVertical: 10,
    marginBottom: 20
  },
  formContainer: {
    alignItems: "center"
  },
  inputField: {
    width: "85%"
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "80%",
    marginTop: 20
  }
});

export default NoteFormModal;
