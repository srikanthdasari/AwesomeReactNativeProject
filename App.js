import React from 'react';
import {StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import RootComponent from './components/RootComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import TickerSearch from './components/TickerSearch';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WatchList from './components/WatchList';
import('./utils/ReactotronConfig').then(() =>
  console.log('Reactotron Configured'),
);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = ({theme}) => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={TickerSearch} />
      </Stack.Navigator> */}

      {/* <RootComponent
        style={[styles.container, {backgroundColor: theme.colors.surface}]}
      /> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Portfolio') {
              iconName = 'ios-home';
            } else if (route.name === 'Search') {
              iconName = 'ios-search';
            } else if (route.name === 'Watchlist') {
              iconName = 'ios-star';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.secondary,
          activeBackgroundColor: theme.colors.surface,
          inactiveBackgroundColor: theme.colors.surface,
        }}>
        <Tab.Screen name="Portfolio" component={Home} />
        <Tab.Screen name="Watchlist" component={WatchList} />
        <Tab.Screen name="Search" component={TickerSearch} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(App);
