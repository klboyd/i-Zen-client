// form modal for creating a progression

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { postItem } from "../../modules/APIManager";

const ProgressionFormModal = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const cancelFormHandler = () => {
    setName("");
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (name === "" || description === "") {
      Alert.alert("Fields cannot be blank");
    } else {
      await postItem("progressions", { name: name, description: description });
      setName("");
      setDescription("");
      props.onConfirm();
    }
  };

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isFormVisible}>
      <Text style={styles.formModalHeader}>Add New Progression</Text>
      <View style={styles.formContainer}>
        <Text>What do you want to track?</Text>
        <InputFieldContainer
          inputStyle={styles.inputField}
          placeholder="ex: Cooking More Meals"
          value={name}
          // autoCapitalize="none"
          onChangeText={setName}
        />
        <Text>Why do you want to improve this?</Text>
        <InputFieldContainer
          inputStyle={styles.inputField}
          placeholder="ex: To stop eating so much fast food"
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

export default ProgressionFormModal;
