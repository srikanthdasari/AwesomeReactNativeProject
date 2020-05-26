import React from 'react';
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useStore} from './../store/store';
import {getTickerSearch} from './../actions/SearchAction';
import {addToWatchList} from './../actions/AddToWatchList';
import {Searchbar} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import ListItem from './ListItem';
import BottomSheet from 'reanimated-bottom-sheet';

const TickerSearch = ({theme}) => {
  const bs = React.createRef();
  const {state, dispatch} = useStore();
  const [searchString, setSearchString] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState();
  const OnTickerSearch = (ticker) => {
    setSearchString(ticker);
    getTickerSearch(ticker, dispatch);
  };
  const OnClear = () => {
    setSearchString(undefined);
    getTickerSearch(undefined, dispatch);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      color: theme.colors.primary,
    },
    FlatList: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.primary,
    },
    panelContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    panel: {
      height: 600,
      padding: 20,
      backgroundColor: '#f7f5eee8',
    },
    header: {
      backgroundColor: '#f7f5eee8',
      shadowColor: '#000000',
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#318bfb',
      alignItems: 'center',
      marginVertical: 10,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  const onSearchSelect = (item) => {
    console.log('press called ', item);
    setSelectedItem(item);
    bs.current.snapTo(0);
  };

  const onAddToPortfolio = () => {};

  const onAddToWatchList = () => {
    if (selectedItem) {
      addToWatchList(selectedItem.symbol, dispatch);
    }
  };

  const onClose = () => {
    bs.current.snapTo(2);
    setSelectedItem(undefined);
  };

  const renderInner = () => (
    <View style={styles.panel}>
      {/* <Text style={styles.panelTitle}>Panel Title</Text>
      <Text style={styles.panelSubtitle}>Panel sub titles</Text> */}
      <TouchableOpacity style={styles.panelButton} onPress={onAddToPortfolio}>
        <Text style={styles.panelButtonTitle}>Add to Portfolio</Text>
        {/* <Button
          title="Add to Portfolio"
          style={styles.panelButtonTitle}
          onPress={onAddToPortfolio}
        /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={onAddToWatchList}>
        {/* <Button
          title="Add to Watchlist"
          style={styles.panelButtonTitle}
          onPress={onAddToWatchList}
        /> */}
        <Text style={styles.panelButtonTitle}>Add to Watchlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={onClose}>
        {/* <Button
          title="Close"
          style={styles.panelButtonTitle}
          onPress={onClose}
        /> */}
        <Text style={styles.panelButtonTitle}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Ticker"
        value={searchString}
        onChangeText={OnTickerSearch}
        clear={OnClear}
      />
      {state.searchString && state.searchString.length > 0 && (
        <FlatList
          data={state.searchResults}
          renderItem={({item}) => (
            <ListItem
              autoFocus={true}
              OnSelect={onSearchSelect}
              keyeExtractor={item.symbol}
              item={item}
            />
          )}
        />
      )}
      <BottomSheet
        ref={bs}
        snapPoints={[500, 250, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={2}
      />
    </View>
  );
};

export default withTheme(TickerSearch);
