import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Card(props) {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // Shadow properties only work on iOS
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // Use elevation for shadown on Andriod
    elevation: 1,

    borderColor: Colors.primary,
    padding: 20,
    borderRadius: 4,
  },
});

export default Card;
