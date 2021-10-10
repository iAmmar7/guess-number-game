import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
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
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
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
            <MainButton size="small" type="secondary" onPress={resetHandler}>
              Reset
            </MainButton>
            <MainButton size="small" onPress={confirmHandler}>
              Confirm
            </MainButton>
          </View>
        </Card>
        {/* {confirmedOutput} */}
        {confirmed && (
          <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
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
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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
    width: 220,
  },
});

export default StartGame;
