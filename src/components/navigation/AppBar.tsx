import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TIcon } from '../../icons/icons';
import { Icon } from '../ui';
import { COLORS } from '../../colors';

type Props = {
  icon: TIcon;
  title: string;
};

export function AppBar({ title, icon }: Props) {
  return (
    <View style={styles.appBar}>
      <Icon name={icon} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
