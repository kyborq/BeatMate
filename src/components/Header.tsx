import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <Icon name="appLogo" size={48} />
        <Text style={styles.title}>Мьюзик</Text>
      </View>
      <IconButton icon="user" background="#e2e2e2" color="#c7c7c7" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
