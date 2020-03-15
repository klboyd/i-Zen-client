import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, Alert } from "react-native";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import { getAll } from "../modules/APIManager";
import ProgressionCard from "../components/Progression/ProgressionCard";
import FooterComponent from "../components/Footer/FooterComponent";
import ZenButton from "../components/ButtonComponent/ZenButton";
import Colors from "../modules/Colors";

const ProgressionScreen = props => {
  const [progressions, setProgressions] = useState([]);

  const getProgressionsHandler = async () => {
    return await getAll("progressions");
  };
  const addProgressionHandler = () =>
    Alert.alert("Pressed the add progression button");

  useEffect(() => {
    const loadProgressions = async () => {
      const progressions = await getProgressionsHandler();
      setProgressions(progressions);
    };
    loadProgressions();
  }, [props.triggerProgressions]);

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={progressions}
        renderItem={progression => (
          <ProgressionCard progression={progression.item} />
        )}
      />
      <FooterComponent>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.background.primary }}
          onPress={addProgressionHandler}>
          <Text style={styles.addButtonText}>Add</Text>
        </ZenButton>
      </FooterComponent>
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

export default ProgressionScreen;
