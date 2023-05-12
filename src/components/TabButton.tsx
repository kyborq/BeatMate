import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  title: string;
  current?: boolean;
  onPress?: (value: string) => void;
};

export const TabButton: React.FC<Props> = ({ title, current, onPress }) => {
  const handlePress = () => {
    onPress && onPress(title);
  };

  const activeStyle: TextStyle = { color: '#000000' };

  return (
    <TouchableOpacity key={uuidv4()} onPress={handlePress}>
      <Text style={[styles.title, current && activeStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#c7c7c7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
