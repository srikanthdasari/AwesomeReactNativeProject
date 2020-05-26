import React from 'react';
import {View, FlatList} from 'react-native';
import Header from './Header';
import {useStore} from './../store/store';
import TickerSearch from './TickerSearch';
import ListItem from './ListItem';
import {withTheme} from 'react-native-paper';
const RootComponent = () => {
  const {state, dispatch} = useStore();
  return (
    <View>
      <Header title="Stocks" />
      <TickerSearch />
      {state.searchString && state.searchString.length > 0 && (
        <FlatList
          data={state.searchResults}
          renderItem={({item}) => <ListItem item={item} />}
        />
      )}
    </View>
  );
};

export default withTheme(RootComponent);
