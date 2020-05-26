import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {withTheme, Chip} from 'react-native-paper';

const WatchListItem = ({item, theme, OnSelect}) => {
  const [selectedItem, setSelectedItem] = useState();
  // const onPress = (item) => {
  //   console.log(item);
  //   setSelectedItem(item);
  // };
  const styles = StyleSheet.create({
    conatiner: {
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
    textDetails: {
      fontSize: 10,
      color: theme.colors.primary,
      margin: 1,
    },
    textNumbers: {
      fontSize: 10,
      color: theme.colors.accent,
      margin: 1,
    },
  });

  return (
    <TouchableOpacity
      keyExtract={item.ticker}
      style={styles.conatiner}
      onPress={() => OnSelect(item)}>
      <View key={item.ticker} style={styles.itemView}>
        <Chip style={styles.ticker}>{item.ticker}</Chip>
        <Text style={styles.textDetails}>{item.securityType}</Text>
        {/* <FontAwesomeIcon name={""} size={20} color="firebrick" /> */}
      </View>
      <View style={styles.itemViewStats}>
        {/* <FeatherIcon name={'sunrise'} color={theme.colors.accent} /> */}
        {/* <Text style={styles.textDetails}>Open :</Text> */}
        {/* <Text style={styles.textNumbers}>{item.marketOpen}</Text> */}
        {/* <FeatherIcon name={'sunset'} color={theme.colors.accent} /> */}
        {/* <Text style={styles.textDetails}>Close :</Text>
        <Text style={styles.textNumbers}>{item.marketClose}</Text> */}
        <Text style={styles.tickerName} numberOfLines={2} ellipsizeMode="tail">
          {item.quote.companyName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(WatchListItem);
