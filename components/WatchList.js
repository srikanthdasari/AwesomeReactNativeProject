import React, {useEffect, useState} from 'react';
import {useStore} from './../store/store';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import {getWatchList} from './../actions/LoadWatchlist';
import WatchListItem from './WatchListItem';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
const WatchList = ({theme}) => {
  const {state, dispatch} = useStore();
  const [watchList, setWatchList] = useState([]);
  useEffect(() => {
    if (!_.isEmpty(state.watchList)) {
      console.log(state.watchList);
      const tickers = Object.keys(state.watchList);
      const finalWatchlist = tickers.map((x) => {
        return {
          ticker: x,
          ...state.watchList[x],
        };
      });
      console.log(finalWatchlist);
      setWatchList(finalWatchlist);
    } else {
      getWatchList(dispatch);
    }
  }, [dispatch, state.watchList]);

  const onSelect = (item) => {
    console.log(item);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      color: theme.colors.primary,
    },
    touchableContainer: {
      padding: 15,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    itemView: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemViewStats: {
      flexDirection: 'row',
      // justifyContent: 'space-around',
      padding: 3,
      margin: 3,
      fontSize: 10,
      color: theme.colors.primary,
    },
    ticker: {
      color: theme.colors.accent,
      backgroundColor: theme.colors.primary,
      // fontSize: 14,
      margin: 1,
    },
    tickerName: {
      // color: '#ffffff',
      color: theme.colors.accent,
      fontSize: 14,
      textDecorationStyle: 'dotted',
      flexWrap: 'wrap',
      marginLeft: 2,
      marginRight: 1,
    },
  });

  return (
    <View>
      {/* {watchList && watchList.length > 0 ? (
        watchList.map((x) => (
          <TouchableOpacity
            keyExtract={x.ticker}
            style={styles.touchableContainer}>
            <Text>{x.ticker}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.tickerName}>No Watchlist</Text>
      )} */}
      <FlatList
        data={watchList}
        renderItem={({item}) => (
          <WatchListItem
            autoFocus={true}
            OnSelect={onSelect}
            keyeExtractor={item.symbol}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default withTheme(WatchList);
