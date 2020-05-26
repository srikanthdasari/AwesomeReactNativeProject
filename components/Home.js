import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';

const Home = ({navigation, theme}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{color: theme.colors.primary}}>Home Screen</Text>
      <Button
        title="Go to Search"
        style={{color: theme.colors.primary}}
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
};

export default withTheme(Home);
