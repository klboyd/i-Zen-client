import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Screen from "../components/ScreenComponent/ScreenContainer";
import { getAll } from "../modules/APIManager";
import ProgressionCard from "../components/Progression/ProgressionCard";

const ProgressionScreen = props => {
  const [progressions, setProgressions] = useState([]);

  const getProgressionsHandler = async () => {
    return await getAll("progressions");
  };

  useEffect(() => {
    const loadProgressions = async () => {
      const progressions = await getProgressionsHandler();
      setProgressions(progressions);
    };
    loadProgressions();
  }, []);

  return (
    <Screen style={{ ...styles.screen, ...props.style }}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={progressions}
        renderItem={progression => (
          <ProgressionCard progression={progression.item} />
        )}
      />
      {/* {progressions.map(progression => (
        <ProgressionCard key={progression.id} progression={progression} />
      ))} */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {}
});

export default ProgressionScreen;
