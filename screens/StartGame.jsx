import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

function StartGame({ onStartGame }) {
  const [number, setNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = (value) => {
    setNumber(value.replace(/[^0-9]/g, ''));
  };

  const resetHandler = () => {
    setNumber('');
    setSelectedNumber();
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(number);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [
        { text: 'Dismiss', style: 'destructive', onPress: resetHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setNumber('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.text}>Select a Number</Text>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="Type.."
            placeholderTextColor={Colors.accent}
            onChangeText={inputHandler}
            value={number}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetHandler} color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {/* {confirmedOutput} */}
        {selectedNumber && (
          <Card style={styles.summaryContainer}>
            <Text style={styles.text}>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="START GAME" color={Colors.primary} onPress={() => onStartGame(selectedNumber)} />
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
    borderRadius: 6,
  },
  input: {
    width: 120,
    height: 40,
    textAlign: 'center',
    color: Colors.white,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: 200,
  },
});

export default StartGame;
