import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Touchable } from './Touchable';
import { Icon } from './Icon';
import { TIcon } from '../icons/icons';

type Props = {
  size?: number;
  icon: TIcon;
  color?: string;
  background?: string;
  onPress?: () => void;
};

const DEFAULT_SIZE = 48;

export const IconButton: React.FC<Props> = ({
  onPress,
  icon,
  size,
  color,
  background,
}) => {
  const buttonSize = size || DEFAULT_SIZE;
  const buttonStyle: ViewStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: background,
  };

  return (
    <Touchable
      style={buttonStyle}
      contentStyle={styles.content}
      onPress={onPress}
    >
      <Icon name={icon} fill={color || '#000000'} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
