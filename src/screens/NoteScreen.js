import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
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
      progressionId: props.route.params.progressionId,
      getActionItemCount: props.route.params.getActionItemCount
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
  }
});

export default NoteScreen;
