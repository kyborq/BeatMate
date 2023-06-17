import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabButton } from './TabButton';
import { COLORS } from '../../colors';
import { TIcon } from '../../icons/icons';

const ICONS: { [key: string]: TIcon } = {
  Home: 'playList',
  Radio: 'broadcast',
  User: 'user',
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        return (
          <TabButton
            key={route.key}
            icon={ICONS[route.name]}
            primary={route.name === 'Radio'}
            current={state.index === index}
            onPress={() => navigation.navigate(route.name || '')}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    gap: 32,

    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
});
