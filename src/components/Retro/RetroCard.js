// card for displaying retro details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

// import RetroEditFormModal from "../Retro/RetroEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
import { removeItem } from "../../modules/APIManager";

const RetroCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  // const removeProgessionCard = async () => {
  //   await removeItem("retros", Number(props.retro.id));
  //   await props.loadRetros();
  // };

  // const onEditConfirm = () => {
  //   setIsEditFormVisible(false);
  //   props.loadRetros();
  // };

  const onLeftButtonPress = async () => {
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
    Alert.alert(`Pressed #${props.cardId}`);
    // props.navigation.navigate("Retro", {
    //   retroId: props.cardId
    // });
  };
  return (
    <SwipeableCard
      {...props}
      handlePress={onPress}
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}>
      <View style={{ ...styles.card, ...props.style }}>
        <Text style={styles.cardText}>{props.retro.name}</Text>
        <Text style={styles.cardDescription}>{props.retro.description}</Text>
      </View>
      {/* <RetroEditFormModal
        onConfirm={onEditConfirm}
        onCancel={() => setIsEditFormVisible(false)}
        isEditFormVisible={isEditFormVisible}
        cardId={props.cardId}
      /> */}
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

export default RetroCard;
