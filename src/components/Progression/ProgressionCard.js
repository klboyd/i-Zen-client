// card for displaying progression details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import ProgressionEditFormModal from "../Progression/ProgressionEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { removeItem } from "../../modules/APIManager";

const ProgressionCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const removeProgessionCard = async () => {
    await removeItem("progressions", Number(props.progression.id));
    await props.loadProgressions();
  };

  const onEditConfirm = () => {
    setIsEditFormVisible(false);
    props.loadProgressions();
  };

  const onLeftButtonPress = async () => {
    Alert.alert(
      "Delete this Progression?",
      "It'll be gone for good!",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeProgessionCard()
        }
      ],
      { cancelable: false }
    );
  };
  const onRightButtonPress = async () => {
    setIsEditFormVisible(true);
  };
  const onPress = () => {
    Alert.alert(`pressed ${props.cardIndex}`);
  };
  return (
    <SwipeableCard
      handlePress={onPress}
      cardIndex={props.cardIndex}
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}>
      <View style={{ ...styles.card, ...props.style }}>
        <Text style={styles.cardText}>{props.progression.name}</Text>
        <Text style={styles.cardDescription}>
          {props.progression.description}
        </Text>
      </View>
      <ProgressionEditFormModal
        onConfirm={onEditConfirm}
        onCancel={() => setIsEditFormVisible(false)}
        isEditFormVisible={isEditFormVisible}
        cardIndex={props.cardIndex}
      />
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    paddingVertical: 5,
    backgroundColor: Colors.light.background.content
  },
  cardText: {
    fontSize: 20
  },
  cardDescription: {
    fontSize: 14
  }
});

export default ProgressionCard;
