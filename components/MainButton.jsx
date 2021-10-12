import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import colors from '../constants/colors';

const MainButton = ({ children, onPress, style, type, size }) => {
  const TouchComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
  return (
    <TouchComponent activeOpacity={0.6} onPress={onPress}>
      <View
        style={{
          ...styles.button,
          ...style,
          ...(type === 'secondary' && { ...styles.secondary }),
          ...(size === 'small' && { ...styles.smallButton }),
        }}
      >
        <Text style={{ ...styles.buttonText, ...(size === 'small' && { ...styles.smallButtonText }) }}>{children}</Text>
      </View>
    </TouchComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    // paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  secondary: {
    backgroundColor: colors.accent,
  },
  smallButton: {
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  smallButtonText: {
    fontSize: 16,
  },
});

export default MainButton;
