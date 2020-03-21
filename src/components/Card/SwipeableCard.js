// swipeable card template for consistent styling

import React from "react";
import { StyleSheet, Animated, Alert, View } from "react-native";

import { Swipeable, TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../modules/Colors";

const SwipeableCard = props => {
  const renderLeftActions = (progress, dragX) => {
    // if (props.isLoading === false) {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.leftActionContent,
            {
              transform: [{ translateX: trans }]
            }
          ]}>
          <Ionicons name="md-trash" size={32} color="white" />
        </Animated.Text>
      </View>
    );
    // }
  };
  const renderRightActions = (progress, dragX) => {
    // if (props.isLoading === false) {
    if (props.onRightSwipe) {
      const trans = dragX.interpolate({
        inputRange: [-101, -100, -50, 0],
        outputRange: [1, 0, 0, 20]
      });
      return (
        <View style={styles.rightAction}>
          <Animated.Text
            style={[
              styles.rightActionContent,
              {
                transform: [{ translateX: trans }]
              }
            ]}>
            <Ionicons name="md-create" size={32} color="white" />
          </Animated.Text>
        </View>
      );
    }
    // }
  };

  return (
    <Swipeable
      ref={ref => (props.row[props.cardIndex] = ref)}
      onSwipeableOpen={() => {
        return props.closeRow(props.cardIndex);
      }}
      friction={3}
      overshootFriction={8}
      style={styles.card}
      leftThreshold={20}
      rightThreshold={20}
      overshootLeft={false}
      overshootRight={false}
      onSwipeableLeftOpen={props.onLeftSwipe}
      onSwipeableRightOpen={props.onRightSwipe || null}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <TouchableHighlight
        underlayColor={Colors.light.background.header}
        onPress={props.handlePress}>
        {props.children}
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: { marginLeft: 0 },
  leftActionContent: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  rightActionContent: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  leftAction: {
    width: 100,
    borderWidth: 0.5,
    backgroundColor: Colors.light.button.negative,
    justifyContent: "center",
    alignItems: "center"
  },
  rightAction: {
    width: 100,
    borderWidth: 0.5,
    backgroundColor: Colors.light.button.neutral,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SwipeableCard;
