import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

function StartGame(props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#1b1c1b',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',

    // Shadow properties only work on iOS
    shadowColor: '#f7287b',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // Use elevation for shadown on Andriod
    elevation: 1,

    borderColor: '#000',
    padding: 20,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default StartGame;
