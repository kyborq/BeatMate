import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from './IconButton';
import {TIcon} from '../icons/icons';

type Props = {
  label?: string;
  icon?: TIcon;
  onClear?: () => void;
};

export const Chip: React.FC<Props> = ({icon, label, onClear}) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      {icon && <IconButton size={32} icon={icon} foregroundColor="#c7c7c7" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    minHeight: 32,
    paddingVertical: 2,
    backgroundColor: '#e2e2e2',
    paddingRight: 6,
    borderRadius: 8,
  },
});
