import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGame from './screens/StartGame';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Guess a Number" />
      <StartGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
