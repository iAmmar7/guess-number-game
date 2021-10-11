import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (newMax - newMin)) + newMin;
  if (rndNum === exclude) {
    return generateRandomBetween(newMin, newMax, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess - 1;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current);
    setCurrentGuess(nextNumber);
    setPastGuesses((prevGuesses) => [nextNumber.toString(), ...prevGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={{ ...DefaultStyles.title, ...styles.title }}>My guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton size="small" type="secondary" onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton size="small" onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <BodyText>#{pastGuesses.length - index}</BodyText>
              <BodyText>{guess}</BodyText>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <View style={styles.listItem}>
              <BodyText>#{pastGuesses.length - itemData.index}</BodyText>
              <BodyText>{itemData.item}</BodyText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 200,
    maxWidth: '80%',
  },
  listContainer: {
    flex: 1,
    width: '30%',
    marginTop: 10,
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;
