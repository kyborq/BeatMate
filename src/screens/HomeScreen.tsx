import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../colors';
import { AppBar } from '../components/navigation/AppBar';

export function HomeScreen() {
  return (
    <View style={styles.root}>
      <AppBar icon="appLogo" title="Главная" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
  },
});
