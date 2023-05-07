import React from 'react';
import {TIcon} from '../icons/icons';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Icon} from './Icon';

type Props = {
  icon: TIcon;
  size?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  onPress?: () => void;
};

export const IconButton: React.FC<Props> = ({
  icon,
  size,
  backgroundColor,
  foregroundColor,
  onPress,
}) => {
  const buttonSize = {width: size || 48, height: size || 48};

  return (
    <View style={[styles.base, buttonSize]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.button, buttonSize, {backgroundColor}]}>
          <Icon name={icon} fill={foregroundColor} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
