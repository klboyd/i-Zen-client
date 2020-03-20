import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import NoteCard from "./NoteCard";

import Colors from "../../modules/Colors";
import ZenButton from "../ButtonComponent/ZenButton";

const NoteList = props => {
  return (
    <>
      {props.title && (
        <View style={styles.listTitle}>
          <Text style={styles.listTitleText}>{props.title}</Text>
          <ZenButton customStyle={styles.addButton}>
            <Text style={{ color: "white", fontSize: 20 }}>+</Text>
          </ZenButton>
        </View>
      )}
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={styles.listContent}
        data={props.notes}
        renderItem={note => (
          <NoteCard
            style={{
              backgroundColor:
                Colors.light.noteCard[
                  note.item.retro_note_board.note_board.board_type
                ]
            }}
            row={props.row}
            prevOpenedRow={props.prevOpenedRow}
            closeRow={props.closeRow}
            closeSelf={props.closeSelf}
            navigation={props.navigation}
            loadNotes={props.loadNotes}
            cardIndex={note.index}
            cardId={note.item.id}
            note={note.item}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.light.background.subHeader,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listContent: { width: "100%", borderWidth: 0.5, flex: 1 },
  listTitleText: {
    fontSize: 20,
    marginHorizontal: 20
  },
  addButton: {
    height: 35,
    width: 35
  }
});

export default NoteList;
