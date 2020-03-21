import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View, Alert } from "react-native";

import FooterComponent from "../components/Footer/FooterComponent";
// import ActionItemFormModal from "../components/ActionItem/ActionItemFormModal";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";
// import ActionItemList from "../components/ActionItem/ActionItemList";

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

  const onAddItem = () => Alert.alert("pressed the action item button");

  useEffect(() => {
    if (isFormVisible === false) {
      loadActionItems();
    }
  }, [isFormVisible]);

  return (
    <ScreenContainer
      style={{ ...styles.screen, ...props.style }}
      onAddItem={onAddItem}>
      {actionItems.map(actionItem => (
        <View>
          <Text key={actionItem.id}>{actionItem.description}</Text>
        </View>
        // <ActionItemList
        //   key={actionItem.id}
        //   actionItemDetails={actionItem}
        //   loadActionItems={loadActionItems}
        //   navigation={props.navigation}
        // />
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

export default ActionItemScreen;
