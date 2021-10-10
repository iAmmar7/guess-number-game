import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../constants/colors';

const BodyText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={{ ...styles.text, ...style }} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
    color: colors.white,
  },
});

export default BodyText;
