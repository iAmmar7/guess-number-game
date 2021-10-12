import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOver = ({ rounds, userNumber, onNewGame }) => {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
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
        <MainButton onPress={onNewGame} style={styles.button}>
          NEW GAME
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width > 400 ? 24 : 20,
    marginVertical: Dimensions.get('window').height > 600 ? 10 : 0,
  },
  imageContainer: {
    width: Dimensions.get('window').height < 500 ? 200 : Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height < 500 ? 200 : Dimensions.get('window').width * 0.7,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.white,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: Dimensions.get('window').width > 400 ? 300 : 275,
    marginBottom: Dimensions.get('window').height / 80,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width > 400 ? 18 : 16,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  button: {
    width: 130,
  },
});

export default GameOver;
