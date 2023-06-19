import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import { TabNavigator } from './components/navigation';
import { COLORS } from './colors';
import { store } from './redux';
import locale from './translations';

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.root}>
          <TabNavigator />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
