import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProgressionCard = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <Text style={styles.cardText}>{props.progression.name}</Text>
      <Text style={styles.cardDescription}>
        {props.progression.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  cardText: {
    fontSize: 20
  },
  cardDescription: {
    fontSize: 14
  }
});

export default ProgressionCard;
