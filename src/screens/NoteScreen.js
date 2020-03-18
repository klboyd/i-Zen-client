import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View, Alert } from "react-native";

import FooterComponent from "../components/Footer/FooterComponent";
import NoteCard from "../components/Note/NoteCard";
// import NoteFormModal from "../components/Note/NoteFormModal";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";

const NoteScreen = props => {
  const [notes, setNotes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getNotesHandler = async () => {
    return await getAll(`notes?retro=${props.route.params.retroId}`);
  };
  const addNoteHandler = () => setIsFormVisible(true);

  const loadNotes = async () => {
    const notes = await getNotesHandler();
    setNotes(notes);
  };

  useEffect(() => {
    if (isFormVisible === false) {
      loadNotes();
    }
  }, [isFormVisible]);

  let row = [];
  let prevOpenedRow;
  const closeSelf = index => {
    row[index].close();
  };
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={notes}
        renderItem={note => (
          <NoteCard
            style={{
              backgroundColor:
                Colors.light.noteCard[
                  note.item.retro_note_board.note_board.board_type
                ]
            }}
            row={row}
            prevOpenedRow={prevOpenedRow}
            closeRow={closeRow}
            closeSelf={closeSelf}
            navigation={props.navigation}
            cardIndex={note.index}
            cardId={note.item.id}
            loadNotes={loadNotes}
            note={note.item}
          />
        )}
      />
      <FooterComponent>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={addNoteHandler}>
          <Text style={styles.addButtonText}>Add</Text>
        </ZenButton>
      </FooterComponent>
      {/* <NoteFormModal
        onConfirm={() => setIsFormVisible(false)}
        onCancel={() => setIsFormVisible(false)}
        isFormVisible={isFormVisible}
      /> */}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between"
  },
  addButtonText: {
    padding: 3,
    fontSize: 14
    // color: "white"
  }
});

export default NoteScreen;
