import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";

import FooterComponent from "../components/Footer/FooterComponent";
import RetroCard from "../components/Retro/RetroCard";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";

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

  useEffect(() => {
    loadRetros();
  }, []);

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={retros}
        renderItem={retro => (
          <RetroCard
            cardId={retro.item.id}
            loadRetros={loadRetros}
            retro={retro.item}
          />
        )}
      />
      <FooterComponent>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={() => Alert.alert("pressed this button")}>
          <Text style={styles.addButtonText}>Add</Text>
        </ZenButton>
      </FooterComponent>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screen: { justifyContent: "space-between" }
});

export default RetroScreen;
