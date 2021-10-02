import React, { Children } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Colors.primary,
    fontSize: 22,
  },
});

export default NumberContainer;
