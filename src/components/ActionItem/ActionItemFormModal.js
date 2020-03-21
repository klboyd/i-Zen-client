// form modal for creating a actionItem

import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import RNPickerSelect from "react-native-picker-select";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { getAll, postItem } from "../../modules/APIManager";

const ActionItemFormModal = props => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString());
  const [actionItemStatuses, setActionItemStatuses] = useState([]);

  const getActionItemStatuses = async () => {
    const statuses = await getAll("actionitemstatus");
    setActionItemStatuses(statuses);
  };

  const cancelFormHandler = () => {
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (description === "") {
      Alert.alert("Fields cannot be blank");
    } else {
      await postItem("actionitems", {
        description: description,
        progression: props.progressionId,
        due_at: new Date().toISOString()
      });
      setDescription("");
      props.onConfirm();
    }
  };

  useEffect(() => {
    getActionItemStatuses();
  }, []);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isFormVisible}>
      <Text style={styles.formModalHeader}>Add Action Item</Text>
      <View style={styles.formContainer}>
        <Text>What needs to be done?</Text>
        <InputFieldContainer
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={confirmFormHandler}
          inputStyle={styles.inputField}
          placeholder="ex: Buy more flour"
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

export default ActionItemFormModal;
