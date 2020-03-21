// card for displaying actionItem details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { removeItem } from "../../modules/APIManager";

const ActionItemCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const removeActionItemCard = async () => {
    await removeItem("actionitems", Number(props.actionItem.id));
    await props.loadActionItems();
  };

  const onLeftSwipe = async () => {
    props.closeSelf(props.cardIndex);
    Alert.alert(
      "Delete this ActionItem?",
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
    props.closeSelf(props.cardIndex);
    setIsEditFormVisible(true);
  };
  // const onPress = () => {
  //   props.navigation.navigate("Notes", {
  //     actionItemId: props.cardId,
  //     progressionId: props.progressionId
  //   });
  // };
  return (
    <SwipeableCard
      {...props}
      // handlePress={onPress}
      onLeftSwipe={onLeftSwipe}
      onRightSwipe={onRightSwipe}>
      <View style={{ ...styles.card, ...props.style }}>
        <Text style={styles.cardText}>{props.actionItem.description}</Text>
      </View>
    </SwipeableCard>
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
  }
});

export default ActionItemCard;