// card for displaying note details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

// import NoteEditFormModal from "../Note/NoteEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import Colors from "../../modules/Colors";
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
          onPress: () => removeNoteCard()
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
      noteId: props.cardId
    });
  };
  return (
    <SwipeableCard
      {...props}
      handlePress={onPress}
      onLeftSwipe={onLeftSwipe}
      onRightSwipe={onRightSwipe}>
      <View>
        <View style={{ ...styles.card, ...props.style }}>
          <Text style={styles.cardDescription}>{props.note.description}</Text>
        </View>
        {/* <NoteEditFormModal
          onConfirm={onEditConfirm}
          onCancel={() => setIsEditFormVisible(false)}
          isEditFormVisible={isEditFormVisible}
          cardId={props.cardId}
        /> */}
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
    paddingVertical: 5
  },
  cardText: {
    fontSize: 20
  },
  cardDescription: {
    fontSize: 14
  }
});

export default NoteCard;