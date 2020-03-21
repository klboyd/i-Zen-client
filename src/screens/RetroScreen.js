import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, Alert } from "react-native";

import FooterComponent from "../components/Footer/FooterComponent";
import RetroCard from "../components/Retro/RetroCard";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll, postItem } from "../modules/APIManager";

const RetroScreen = props => {
  const [retros, setRetros] = useState([]);

  const getRetrosHandler = async () => {
    return await getAll(
      `retros?progression=${props.route.params.progressionId}`
    );
  };

  const loadRetros = async () => {
    const retros = await getRetrosHandler();
    setRetros(retros);
  };

  const createRetro = async () => {
    const response = await postItem("retros", {
      progression_id: props.route.params.progressionId
    });

    response.responseMessage && Alert.alert("That retro already exists!");
    await loadRetros();
  };

  const addRetroHandler = () => {
    Alert.alert(
      "Start Retro",
      "Create a new retro with today's date?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Create",
          onPress: createRetro
        }
      ],
      { cancelable: false }
    );
  };
  const onOpenActionItems = () =>
    props.navigation.navigate("Action Items", {
      progressionId: props.route.params.progressionId
    });

  useEffect(() => {
    loadRetros();
  }, []);

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
      onOpenActionItems={onOpenActionItems}
      onAddItem={addRetroHandler}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={retros}
        renderItem={retro => (
          <RetroCard
            row={row}
            prevOpenedRow={prevOpenedRow}
            closeRow={closeRow}
            closeSelf={closeSelf}
            cardIndex={retro.index}
            cardId={retro.item.id}
            navigation={props.navigation}
            loadRetros={loadRetros}
            retro={retro.item}
            progressionId={props.route.params.progressionId}
          />
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screen: { justifyContent: "space-between" }
});

export default RetroScreen;
