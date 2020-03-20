import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View, Alert } from "react-native";

import FooterComponent from "../components/Footer/FooterComponent";
// import NoteFormModal from "../components/Note/NoteFormModal";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";
import NoteList from "../components/Note/NoteList";

const NoteScreen = props => {
  const [positiveNotes, setPositiveNotes] = useState([]);
  const [negativeNotes, setNegativeNotes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getNotesHandler = async () => {
    let positiveNotes = [];
    let negativeNotes = [];

    const notes = await getAll(`notes?retro=${props.route.params.retroId}`);

    notes.forEach(note => {
      if (note.retro_note_board.note_board.board_type === "positive") {
        positiveNotes.push(note);
      } else if (note.retro_note_board.note_board.board_type === "negative") {
        negativeNotes.push(note);
      }
    });
    setPositiveNotes(positiveNotes);
    setNegativeNotes(negativeNotes);
  };
  const addNoteHandler = () => setIsFormVisible(true);

  const loadNotes = async () => {
    await getNotesHandler();
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
      <NoteList
        title="What went well?"
        notes={positiveNotes}
        row={row}
        prevOpenedRow={prevOpenedRow}
        closeRow={closeRow}
        closeSelf={closeSelf}
        loadNotes={loadNotes}
        navigation={props.navigation}
      />
      <NoteList
        title="What went to hell?"
        notes={negativeNotes}
        row={row}
        prevOpenedRow={prevOpenedRow}
        closeRow={closeRow}
        closeSelf={closeSelf}
        loadNotes={loadNotes}
        navigation={props.navigation}
      />
      <FooterComponent>
        <ZenButton
          customStyle={{
            width: 150,
            backgroundColor: Colors.light.button.secondary,
            flex: 1
          }}
          onPress={() => Alert.alert("pressed this button")}>
          <Text style={styles.addButtonText}>Action Items</Text>
        </ZenButton>
        {/* <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={addNoteHandler}>
          <Text style={styles.addButtonText}>Add</Text>
        </ZenButton> */}
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
