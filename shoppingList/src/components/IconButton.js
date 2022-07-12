import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const IconButton = ({ type, onPressOut, id }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity style={styles.iconbutton} onPressOut={_onPressOut}>
      <Image style={styles.iconsize} source={type} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  onPressOut: () => {},
};

const styles = StyleSheet.create({
  iconsize: {
    width:25,
    height:25
  },
});

export default IconButton;
