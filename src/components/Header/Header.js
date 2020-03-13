import React from "react";
import { StyleSheet, View, Text } from "react-native";
import HeaderComponent from "./HeaderComponent";

const Header = props => {
  return (
    <View style={{ ...styles.header, ...props.style }}>
      <HeaderComponent />
      <HeaderComponent />
      <HeaderComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // width: "100%",
    // height: "100%",
    // paddingTop: 30,
    // paddingHorizontal: 20,
    backgroundColor: "#4682b4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Header;
