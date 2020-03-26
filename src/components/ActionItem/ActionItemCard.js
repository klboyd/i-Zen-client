// card for displaying actionItem details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ActionItemEditFormModal from "./ActionItemEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { patchItem, removeItem } from "../../modules/APIManager";
import { formatDate } from "../../modules/FormatDate";

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "90%"
              }}>
              {props.actionItem.status.name === "completed" && (
                <Ionicons
                  style={{ marginHorizontal: 5, alignSelf: "center" }}
                  name="md-checkmark"
                  size={32}
                  color={Colors.light.button.primary}
                />
              )}
              <Text style={styles.cardDescription}>
                {props.actionItem.description}
              </Text>
            </View>
            <View style={styles.cardTimestamp}>
              <Text style={styles.timestampText}>
                by {props.actionItem.created_by.username}{" "}
              </Text>
              <Text style={styles.timestampText}>
                {formatDate(props.actionItem.created_at)}
              </Text>
            </View>
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
    minHeight: 60,
    paddingHorizontal: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    backgroundColor: Colors.light.background.content
  },
  cardDescription: {
    // margin: 8,
    fontSize: 20,
    textAlign: "left"
  },
  cardTimestamp: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // alignSelf: "flex-end",
    paddingHorizontal: 5
    // borderTopWidth: 0.5,
    // borderLeftWidth: 0.5,
    // backgroundColor: "white"
    // borderTopLeftRadius: 5,
    // paddingBottom: 2
  },
  completedCard: {
    backgroundColor: Colors.light.background.subHeader
  },
  timestampText: {
    fontSize: 12
  }
});

export default ActionItemCard;
