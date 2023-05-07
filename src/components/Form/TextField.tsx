import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {TIcon} from '../../icons/icons';
import {Icon} from '../Icon';

type Props = {
  icon?: TIcon;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const TextField: React.FC<Props> = ({
  icon,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {!!icon && <Icon name={icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#e2e2e2',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    elevation: 19,
    alignItems: 'center',
    paddingLeft: 12,
    // borderWidth: 1,
    // borderColor: '#ebebeb',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
});
