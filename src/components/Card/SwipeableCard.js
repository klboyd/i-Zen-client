import React from "react";
import { StyleSheet, View, Text, Button, Alert, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../modules/Colors";

const SwipeableCard = props => {
  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={props.onLeftButtonPress}
        title={"Delete"}>
        <Animated.Text
          style={[
            styles.actionContent,
            {
              transform: [{ translateX: trans }]
            }
          ]}>
          <Ionicons name="md-trash" size={32} color="white" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      overshootLeft={false}
      style={styles.card}
      renderLeftActions={renderLeftActions}>
      {props.children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: { marginLeft: 0 },
  actionContent: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.light.button.negative,
    justifyContent: "center",
    alignItems: "center"
  },
  leftAction: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SwipeableCard;
