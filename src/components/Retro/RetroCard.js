// card for displaying retro details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { removeItem } from "../../modules/APIManager";

const RetroCard = props => {
  const removeRetroCard = async () => {
    await removeItem("retros", Number(props.retro.id));
    await props.loadRetros();
  };

  const onLeftSwipe = async () => {
    props.closeSelf(props.cardIndex);
    Alert.alert(
      "Delete this Retro?",
      "It'll be gone for good!",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: removeRetroCard
        }
      ],
      { cancelable: false }
    );
  };
  const onPress = () => {
    props.navigation.navigate("Notes", {
      retroId: props.cardId
    });
  };
  return (
    <SwipeableCard {...props} handlePress={onPress} onLeftSwipe={onLeftSwipe}>
      <View style={{ ...styles.card, ...props.style }}>
        <Text style={styles.cardText}>{props.retro.name}</Text>
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

export default RetroCard;
