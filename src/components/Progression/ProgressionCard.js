// card for displaying progression details
// plus edit/delete functionality

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import ProgressionEditFormModal from "../Progression/ProgressionEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { removeItem, getAll } from "../../modules/APIManager";

const ProgressionCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [actionItemCount, setActionItemCount] = useState(0);

  const getActionItemCount = async () => {
    const response = await getAll(
      `actionitems/total_open?progression=${props.progression.id}`
    );

    setActionItemCount(response.total);
  };

  const removeProgessionCard = async () => {
    await removeItem("progressions", Number(props.progression.id));
    await props.loadProgressions();
  };

  const onEditConfirm = () => {
    setIsEditFormVisible(false);
    props.loadProgressions();
  };

  const onLeftSwipe = async () => {
    props.closeSelf(props.cardIndex);
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
          onPress: removeProgessionCard
        }
      ],
      { cancelable: false }
    );
  };
  const onRightSwipe = async () => {
    props.closeSelf(props.cardIndex);
    setIsEditFormVisible(true);
  };
  const onPress = () => {
    props.navigation.navigate("Retro", {
      progressionId: props.cardId,
      getActionItemCount: getActionItemCount
    });
  };

  useEffect(() => {
    getActionItemCount();
  }, []);
  return (
    <SwipeableCard
      {...props}
      handlePress={onPress}
      onLeftSwipe={onLeftSwipe}
      onRightSwipe={onRightSwipe}>
      <View>
        <View style={{ ...styles.card, ...props.style }}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{props.progression.name}</Text>
            <Text style={styles.cardDescription}>
              {props.progression.description}
            </Text>
          </View>
          <View style={styles.cardCountContainer}>
            <Text style={styles.cardCountText}>{actionItemCount}</Text>
          </View>
        </View>
        <ProgressionEditFormModal
          onConfirm={onEditConfirm}
          onCancel={() => setIsEditFormVisible(false)}
          isEditFormVisible={isEditFormVisible}
          cardId={props.cardId}
        />
      </View>
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    backgroundColor: Colors.light.background.content
  },
  cardContent: {
    width: "70%"
  },
  cardText: {
    fontSize: 20
  },
  cardCountText: {
    fontSize: 20,
    textAlign: "center"
  },
  cardCountContainer: {
    width: 50,
    backgroundColor: "white",
    borderRadius: 5
  },
  cardDescription: {
    fontSize: 12
  }
});

export default ProgressionCard;
