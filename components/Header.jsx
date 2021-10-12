import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import TitleText from './TitleText';

import Colors from '../constants/colors';

function Header(props) {
  return (
    <View
      style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 75,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: Colors.secondary,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.white : Colors.secondary,
  },
});

export default Header;
