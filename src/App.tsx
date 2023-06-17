import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './components/navigation';
import { View } from 'react-native';
import { COLORS } from './colors';

export const App = () => {
  return (
    <NavigationContainer>
      <View style={{ backgroundColor: COLORS.background, flex: 1 }}>
        <TabNavigator />
      </View>
    </NavigationContainer>
  );
};
