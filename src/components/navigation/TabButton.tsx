import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TIcon } from '../../icons/icons';
import { Icon } from '../ui';
import { COLORS } from '../../colors';

type Props = {
  icon: TIcon;
  primary?: boolean;
  current?: boolean;
  onPress?: () => void;
};

export function TabButton({ icon, primary, current, onPress }: Props) {
  const currentStyle = current ? COLORS.primary : COLORS.inactive;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, primary && styles.primary]}>
        <Icon name={icon} fill={primary ? COLORS.white : currentStyle} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
  },
  primary: {
    backgroundColor: COLORS.primary,

    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 8,
  },
});
