import React from "react";
import { StyleSheet, View, Text } from "react-native";

const HeaderComponent = props => {
  return (
    <View style={{ ...styles.headerComponent, ...props.style }}>
      <Text>HeaderComponent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerComponent: { maxHeight: 40, maxWidth: "25%" }
});

export default HeaderComponent;
