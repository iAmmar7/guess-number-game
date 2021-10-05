import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGame from './screens/StartGame';
import Game from './screens/Game';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => setUserNumber(selectedNumber);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Guess a Number" />
      {userNumber ? <Game userChoice={userNumber} /> : <StartGame onStartGame={startGameHandler} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
