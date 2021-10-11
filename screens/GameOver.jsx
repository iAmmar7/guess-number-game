import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOver = ({ rounds, userNumber, onNewGame }) => {
  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          source={{
            uri: 'https://www.nicepng.com/png/detail/72-723452_customer-retention-success-person-succes-animated.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          I took <Text style={styles.highlight}>{rounds}</Text> rounds to guess your number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onNewGame}>NEW GAME</MainButton>
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
    fontSize: 24,
    marginVertical: 10,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.white,
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: 300,
    marginBottom: 20,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
});

export default GameOver;
