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
  const [boards, setBoards] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getNotesHandler = async () => {
    const allBoards = await getAll(
      `retronoteboards?retro=${props.route.params.retroId}`
    );

    const boards = allBoards.map(board => {
      return {
        id: board.id,
        name: board.note_board.name,
        type: board.note_board.board_type
      };
    });

    setBoards(boards);
  };

  const addNoteHandler = () => setIsFormVisible(true);

  const loadNotes = async () => {
    return await getNotesHandler();
  };

  const onOpenActionItems = () =>
    props.navigation.navigate("Action Items", {
      progressionId: props.progressionId
    });

  useEffect(() => {
    if (isFormVisible === false) {
      loadNotes();
    }
  }, [isFormVisible]);

  return (
    <ScreenContainer
      style={{ ...styles.screen, ...props.style }}
      onOpenActionItems={onOpenActionItems}>
      {boards.map(board => (
        <NoteList
          key={board.id}
          boardDetails={board}
          loadNotes={loadNotes}
          navigation={props.navigation}
        />
      ))}
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
