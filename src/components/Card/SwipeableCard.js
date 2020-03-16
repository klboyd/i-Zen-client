import React from "react";
import { StyleSheet, Animated } from "react-native";
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
            styles.leftActionContent,
            {
              transform: [{ translateX: trans }]
            }
          ]}>
          <Ionicons name="md-trash" size={32} color="white" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-101, -100, -50, 0],
      outputRange: [1, 0, 0, 20]
    });
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={props.onRightButtonPress}
        title={"Delete"}>
        <Animated.Text
          style={[
            styles.rightActionContent,
            {
              transform: [{ translateX: trans }]
            }
          ]}>
          <Ionicons name="md-create" size={32} color="white" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      overshootLeft={false}
      overshootRight={false}
      style={styles.card}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {props.children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: { marginLeft: 0 },
  leftActionContent: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.light.button.negative,
    justifyContent: "center",
    alignItems: "center"
  },
  rightActionContent: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.light.button.neutral,
    justifyContent: "center",
    alignItems: "center"
  },
  leftAction: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SwipeableCard;
