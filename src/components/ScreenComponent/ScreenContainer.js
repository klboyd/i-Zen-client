// container for screens for consistent styling

import React from "react";
import { StyleSheet, View } from "react-native";

const ScreenContainer = props => {
  return (
    <View style={{ ...styles.screen, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // marginTop: 20,
    // marginBottom: 50,
    borderTopWidth: 1,
    flex: 1,
    // width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default ScreenContainer;
