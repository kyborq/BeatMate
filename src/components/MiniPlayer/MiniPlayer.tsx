import React from 'react';
import {StyleSheet, View} from 'react-native';

export const MiniPlayer = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    marginHorizontal: 32,
    marginBottom: 24,
    borderRadius: 16,
    height: 80,
  },
});
