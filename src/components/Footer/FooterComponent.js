// footer template for consistent styling

import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../../modules/Colors";

const FooterComponent = props => {
  return (
    <View style={{ ...styles.footerComponent, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  footerComponent: {
    height: 80,
    width: "100%",
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.light.background.header,
    borderTopWidth: 1
  }
});

export default FooterComponent;
