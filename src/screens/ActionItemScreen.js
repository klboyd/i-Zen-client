import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View, Alert } from "react-native";

// import ActionItemFormModal from "../components/ActionItem/ActionItemFormModal";
import ActionItemCard from "../components/ActionItem/ActionItemCard";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";

const ActionItemScreen = props => {
  const [actionItems, setActionItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getActionItemsHandler = async () => {
    const allActionItems = await getAll(
      `actionitems?progression=${props.route.params.progressionId}`
    );

    setActionItems(allActionItems);
  };

  const addActionItemHandler = () => setIsFormVisible(true);

  const loadActionItems = async () => {
    return await getActionItemsHandler();
  };

  const onAddItem = () => Alert.alert("pressed the addn item button");

  useEffect(() => {
    if (isFormVisible === false) {
      loadActionItems();
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
      onAddItem={onAddItem}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={actionItems}
        renderItem={actionItem => (
          <ActionItemCard
            row={row}
            prevOpenedRow={prevOpenedRow}
            closeRow={closeRow}
            closeSelf={closeSelf}
            navigation={props.navigation}
            cardIndex={actionItem.index}
            cardId={actionItem.item.id}
            loadActionItems={loadActionItems}
            actionItem={actionItem.item}
          />
        )}
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
    // color: "white"
  }
});

export default ActionItemScreen;
