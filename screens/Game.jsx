import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    const updateLayout = () => setDeviceHeight(Dimensions.get('window').height);
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

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

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={{ ...DefaultStyles.title, ...styles.title }}>My guess</Text>
        <View style={styles.controls}>
          <MainButton size="small" type="secondary" onPress={() => nextGuessHandler('lower')} style={styles.button}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton size="small" onPress={() => nextGuessHandler('greater')} style={styles.button}>
            <AntDesign name="arrowup" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
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
  }

  return (
    <View style={styles.screen}>
      <Text style={{ ...DefaultStyles.title, ...styles.title }}>My guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton size="small" type="secondary" onPress={() => nextGuessHandler('lower')} style={styles.button}>
          <AntDesign name="arrowdown" size={24} color="white" />
        </MainButton>
        <MainButton size="small" onPress={() => nextGuessHandler('greater')} style={styles.button}>
          <AntDesign name="arrowup" size={24} color="white" />
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 200,
    marginTop: 0,
    maxWidth: '80%',
  },
  button: {
    width: 50,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '30%' : '40%',
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
