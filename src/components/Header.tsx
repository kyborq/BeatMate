import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TIcon} from '../icons/icons';
import {Icon} from './Icon';

type Props = {
  leftIcon?: TIcon;
  rightIcon?: TIcon;
  title: string;
};

export const Header: React.FC<Props> = ({title, leftIcon, rightIcon}) => {
  return (
    <View style={styles.header}>
      {leftIcon && <Icon name={leftIcon} />}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && <Icon name={rightIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
