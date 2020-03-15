import React from "react";
import { StyleSheet, View, Text, Button, Alert, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";

const SwipeableCard = props => {
  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <Button
        style={styles.leftAction}
        onPress={props.onLeftButtonPress}
        title={"Delete"}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}></Animated.Text>
      </Button>
    );
  };
  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      {props.children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {},
  leftAction: {}
});

export default SwipeableCard;
