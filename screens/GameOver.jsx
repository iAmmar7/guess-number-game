import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/colors';

const GameOver = ({ rounds, userNumber, onNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is Over!</Text>
      <Text style={styles.number}>Number of rounds: {rounds} </Text>
      <Text style={styles.number}>You chose: {userNumber} </Text>
      <Button title="NEW GAME" onPress={onNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    marginVertical: 10,
  },
});

export default GameOver;
