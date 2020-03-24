// card for displaying note details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import NoteEditFormModal from "../Note/NoteEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import { removeItem } from "../../modules/APIManager";

const NoteCard = props => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const removeNoteCard = async () => {
    await removeItem("notes", Number(props.note.id));
    await props.loadNotes();
  };

  const onEditConfirm = () => {
    setIsEditFormVisible(false);
    props.loadNotes();
  };

  const onLeftSwipe = async () => {
    props.closeSelf(props.cardIndex);
    Alert.alert(
      "Delete this Note?",
      "It'll be gone for good!",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: removeNoteCard
        }
      ],
      { cancelable: false }
    );
  };
  const onRightSwipe = async () => {
    props.closeSelf(props.cardIndex);
    setIsEditFormVisible(true);
  };
  return (
    <SwipeableCard
      {...props}
      onLeftSwipe={onLeftSwipe}
      onRightSwipe={onRightSwipe}>
      <View>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ ...styles.card, ...props.style }}>
            <Text style={styles.cardDescription}>{props.note.description}</Text>
          </View>
        </View>
        <NoteEditFormModal
          onConfirm={onEditConfirm}
          onCancel={() => setIsEditFormVisible(false)}
          isEditFormVisible={isEditFormVisible}
          cardId={props.cardId}
          boardDetails={props.boardDetails}
        />
      </View>
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5
  },
  cardText: {
    fontSize: 20
  },
  cardDescription: {
    margin: 8,
    fontSize: 20,
    textAlign: "center"
  }
});

export default NoteCard;
