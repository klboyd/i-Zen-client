// card for displaying actionItem details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import ActionItemEditFormModal from "./ActionItemEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { patchItem, removeItem } from "../../modules/APIManager";

const ActionItemCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const removeActionItemCard = async () => {
    await removeItem("actionitems", Number(props.actionItem.id));
    await props.loadActionItems();
  };
  const onEditConfirm = () => {
    setIsEditFormVisible(false);
    props.loadActionItems();
  };

  const onComplete = async () => {
    await patchItem("actionitems", props.actionItem.id, {});
    props.loadActionItems();
  };

  const onLeftSwipe = async () => {
    props.closeSelf(props.cardIndex);
    Alert.alert(
      "Delete this Action Item?",
      "It'll be gone for good!",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: removeActionItemCard
        }
      ],
      { cancelable: false }
    );
  };
  const onRightSwipe = async () => {
    if (props.actionItem.status.name !== "completed") {
      props.closeSelf(props.cardIndex);
      setIsEditFormVisible(true);
    }
  };
  const onPress = () => {
    if (props.actionItem.status.name !== "completed") {
      Alert.alert(
        "Mark this Action Item as complete?",
        "It'll be gone for good!",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Complete",
            onPress: onComplete
          }
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <>
      <SwipeableCard
        {...props}
        handlePress={onPress}
        onLeftSwipe={onLeftSwipe}
        onRightSwipe={
          props.actionItem.status.name !== "completed" && onRightSwipe
        }>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ ...styles.card, ...props.style }}>
            <Text style={styles.cardText}>{props.actionItem.description}</Text>
          </View>
          <ActionItemEditFormModal
            onConfirm={onEditConfirm}
            onCancel={() => setIsEditFormVisible(false)}
            isEditFormVisible={isEditFormVisible}
            cardId={props.actionItem.id}
          />
        </View>
      </SwipeableCard>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 60,
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
  },
  completedCard: {
    backgroundColor: Colors.light.background.subHeader
  }
});

export default ActionItemCard;
