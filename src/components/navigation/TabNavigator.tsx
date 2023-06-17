import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './TabBar';
import { HomeScreen } from '../../screens/HomeScreen';
import { UserScreen } from '../../screens/UserScreen';
import { RadioScreen } from '../../screens/RadioScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Radio" component={RadioScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};
