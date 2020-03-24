// form modal for editing a note

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { putItem, getOne } from "../../modules/APIManager";

const NoteEditFormModal = props => {
  const [description, setDescription] = useState("");

  const cancelFormHandler = () => {
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (description === "") {
      Alert.alert("Description cannot be blank");
    } else {
      await putItem("notes", props.cardId, {
        description: description
      });
      setDescription("");
      props.onConfirm();
    }
  };

  const getNoteDetails = async () => {
    const details = await getOne("notes", props.cardId);
    setDescription(details.description);
  };

  useEffect(() => {
    if (props.isEditFormVisible === true) {
      getNoteDetails();
    }
  }, [props.isEditFormVisible]);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isEditFormVisible}>
      <Text style={styles.formModalHeader}>Edit Note</Text>
      <View style={styles.formContainer}>
        <Text>Description</Text>
        <InputFieldContainer
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={confirmFormHandler}
          inputStyle={styles.inputField}
          placeholder={`Enter something ${props.boardDetails.type}!`}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.secondary }}
          onPress={cancelFormHandler}>
          <Text style={styles.buttonText}>Cancel</Text>
        </ZenButton>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={confirmFormHandler}>
          <Text style={styles.buttonText}>Save</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  }
});

export default NoteEditFormModal;
