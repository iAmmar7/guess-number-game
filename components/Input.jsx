import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 18,
  },
});

export default Input;
