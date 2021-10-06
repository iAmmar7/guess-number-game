import React from 'react';
import { StyleSheet, View } from 'react-native';

import TitleText from './TitleText';

import Colors from '../constants/colors';

function Header(props) {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 75,
    paddingTop: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
  },
});

export default Header;
