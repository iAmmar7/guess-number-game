import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../constants/colors';

const TitleText = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: colors.white,
  },
});

export default TitleText;
