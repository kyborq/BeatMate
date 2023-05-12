import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';

type Props = {
  title: string;
};

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <Icon name="appLogo" size={48} />
        <Text style={styles.title}>{title}</Text>
      </View>
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
