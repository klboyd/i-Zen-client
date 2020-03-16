import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import SwipeableCard from "../Card/SwipeableCard";
import { removeItem } from "../../modules/APIManager";

const ProgressionCard = props => {
  const removeProgessionCard = async () => {
    await removeItem("progressions", Number(props.progression.id));
    await props.loadProgressions();
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
  return (
    <SwipeableCard onLeftButtonPress={onLeftButtonPress}>
      <View style={{ ...styles.card, ...props.style }}>
        <Text style={styles.cardText}>{props.progression.name}</Text>
        <Text style={styles.cardDescription}>
          {props.progression.description}
        </Text>
      </View>
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    paddingVertical: 5
  },
  cardText: {
    fontSize: 20
  },
  cardDescription: {
    fontSize: 14
  }
});

export default ProgressionCard;
