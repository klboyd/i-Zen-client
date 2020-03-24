// form modal for creating a actionItem

import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { getAll, getOne, putItem } from "../../modules/APIManager";

const ActionItemFormModal = props => {
  const [description, setDescription] = useState("");
  const [actionItemStatuses, setActionItemStatuses] = useState([]);

  const getActionItemStatuses = async () => {
    const statuses = await getAll("actionitemstatus");
    setActionItemStatuses(statuses);
  };

  const getActionItemDetails = async () => {
    const details = await getOne("actionitems", props.cardId);
    setDescription(details.description);
  };

  const cancelFormHandler = () => {
    setDescription("");
    setActionItemStatuses("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (description === "") {
      Alert.alert("Fields cannot be blank");
    } else {
      await putItem("actionitems", props.cardId, {
        description: description
      });
      setDescription("");
      props.onConfirm();
    }
  };

  useEffect(() => {
    if (props.isEditFormVisible === true) {
      getActionItemStatuses();
      getActionItemDetails();
    }
  }, [props.isEditFormVisible]);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isEditFormVisible}>
      <Text style={styles.formModalHeader}>Edit Action Item</Text>
      <View style={styles.formContainer}>
        <Text>Description</Text>
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
  },
  buttonText: {
    color: Colors.light.text.primary
  }
});

export default ActionItemFormModal;
