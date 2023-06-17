import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../colors';

export function UserScreen() {
  return <View style={styles.root}></View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
  },
});
