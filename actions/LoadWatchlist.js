import {
  LOAD_WATCHLIST_SUCCESS,
  LOAD_WATCHLIST_INPROGRESS,
  LOAD_WATCHLIST_ERROR,
} from './../constants/ActionTypes';
import axios from 'axios';
import {getData} from '../utils/AsyncStorageWrapper';
import {WATCHLIST} from './../constants/storage-keys';
import _ from 'lodash';
import {UrlBuilder} from '../utils/UrlBuilder';
import {ENDPOINT} from './../constants/Endpoint';

export const loadWatchListInProgressAction = () => {
  return {
    type: LOAD_WATCHLIST_INPROGRESS,
  };
};

export const loadWatchListErrorAction = (error) => {
  return {
    type: LOAD_WATCHLIST_ERROR,
    error,
  };
};

export const loadWatchListSuccessAction = (data) => {
  return {
    type: LOAD_WATCHLIST_SUCCESS,
    data,
  };
};

export const getWatchList = async (dispatch) => {
  dispatch(loadWatchListInProgressAction());
  try {
    const existingData = await getData(WATCHLIST);
    if (_.isArray(existingData)) {
      const urlObj = new UrlBuilder()
        .setBaseUrl()
        .setEndpoint(ENDPOINT.WATCHLIST_DETAILS)
        .setCustomQuery('symbols', existingData.join(','))
        .setCustomQuery('types', 'quote,news,chart')
        .setCustomQuery('range', '1m')
        .setCustomQuery('last', 5)
        .setPublicToken()
        .build();
      console.log(urlObj.getUrl());
      await axios.get(urlObj.getUrl()).then((resp) => {
        dispatch(loadWatchListSuccessAction(resp.data));
      });
    }
  } catch (e) {
    dispatch(loadWatchListErrorAction(e));
  }
};
