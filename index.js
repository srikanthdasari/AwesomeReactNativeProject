/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {StoreProvider} from './store/store';

const theme = {
  ...DarkTheme,
  roundness: 2,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
};

export default function Main() {
  return (
    <StoreProvider>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
