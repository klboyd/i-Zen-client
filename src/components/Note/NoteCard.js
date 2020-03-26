// card for displaying note details
// plus edit/delete functionality

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import NoteEditFormModal from "../Note/NoteEditFormModal";
import SwipeableCard from "../Card/SwipeableCard";

import { removeItem } from "../../modules/APIManager";
import { formatDate } from "../../modules/FormatDate";

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
            <View style={styles.cardTimestamp}>
              <Text style={styles.timestampText}>
                by {props.note.created_by.username}{" "}
              </Text>
              <Text style={styles.timestampText}>
                {formatDate(props.note.created_at)}
              </Text>
            </View>
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
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "flex-start",
    borderBottomWidth: 0.5,
    paddingHorizontal: 5
  },
  cardDescription: {
    margin: 8,
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
  timestampText: {
    fontSize: 12
  }
});

export default NoteCard;
