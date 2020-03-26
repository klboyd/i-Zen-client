import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import ProgressionCard from "../components/Progression/ProgressionCard";
import ProgressionFormModal from "../components/Progression/ProgressionFormModal";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";

import { getAll } from "../modules/APIManager";

const ProgressionScreen = props => {
  const [progressions, setProgressions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getProgressionsHandler = async () => {
    return await getAll("progressions");
  };
  const addProgressionHandler = () => setIsFormVisible(true);

  const loadProgressions = async () => {
    const progressions = await getProgressionsHandler();
    setProgressions(progressions);
    if (progressions.length === 0) {
      addProgressionHandler();
    }
  };

  useEffect(() => {
    if (isFormVisible === false) {
      loadProgressions();
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
    <ScreenContainer
      style={{ ...styles.screen, ...props.style }}
      onAddItem={addProgressionHandler}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={progressions}
        renderItem={progression => (
          <ProgressionCard
            row={row}
            prevOpenedRow={prevOpenedRow}
            closeRow={closeRow}
            closeSelf={closeSelf}
            navigation={props.navigation}
            cardIndex={progression.index}
            cardId={progression.item.id}
            loadProgressions={loadProgressions}
            progression={progression.item}
          />
        )}
      />
      <ProgressionFormModal
        onConfirm={() => setIsFormVisible(false)}
        onCancel={() => setIsFormVisible(false)}
        isFormVisible={isFormVisible}
      />
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

export default ProgressionScreen;
