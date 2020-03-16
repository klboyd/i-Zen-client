import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, Alert } from "react-native";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import { getAll } from "../modules/APIManager";
import ProgressionCard from "../components/Progression/ProgressionCard";
import FooterComponent from "../components/Footer/FooterComponent";
import ZenButton from "../components/ButtonComponent/ZenButton";
import Colors from "../modules/Colors";
import ProgressionFormModal from "../components/Progression/ProgressionFormModal";

const ProgressionScreen = props => {
  const [progressions, setProgressions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getProgressionsHandler = async () => {
    return await getAll("progressions");
  };
  const addProgressionHandler = () => setIsFormVisible(true);
  const hideFormModal = () => setIsFormVisible(false);

  const loadProgressions = async () => {
    const progressions = await getProgressionsHandler();
    setProgressions(progressions);
  };

  useEffect(() => {
    if (isFormVisible === false) {
      loadProgressions();
    }
  }, [isFormVisible]);

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={progressions}
        renderItem={progression => (
          <ProgressionCard
            loadProgressions={loadProgressions}
            progression={progression.item}
          />
        )}
      />
      <FooterComponent>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.background.primary }}
          onPress={addProgressionHandler}>
          <Text style={styles.addButtonText}>Add</Text>
        </ZenButton>
      </FooterComponent>
      <ProgressionFormModal
        onConfirm={hideFormModal}
        onCancel={hideFormModal}
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
    // color: "white"
  }
});

export default ProgressionScreen;
