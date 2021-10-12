import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';

import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

function StartGame({ onStartGame }) {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const [number, setNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => setButtonWidth(Dimensions.get('window').width / 4);
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

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
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
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
                <MainButton size="small" type="secondary" onPress={resetHandler} style={{ width: buttonWidth }}>
                  Reset
                </MainButton>
                <MainButton size="small" onPress={confirmHandler} style={{ width: buttonWidth }}>
                  Confirm
                </MainButton>
              </View>
            </Card>
            {confirmed && (
              <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)} style={styles.startGameButton}>
                  START GAME
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
  },
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    // maxWidth: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4,
  // },
  input: {
    width: 120,
    height: 40,
    textAlign: 'center',
    color: Colors.accent,
    fontFamily: 'open-sans-bold',
  },
  summaryContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: 220,
  },
  startGameButton: {
    width: 150,
  },
});

export default StartGame;
